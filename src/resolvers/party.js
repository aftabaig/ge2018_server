module.exports = {
    Query: {
        parties: async(parent, context, { models }) => {
            const parties = models.Party.findAll({
                include: [{
                    model: models.Symbol,
                    as: 'symbol',
                    required: false,
                }, {
                    model: models.Candidate,
                    as: 'candidates',
                    required: false, 
                    include: [{
                        model: models.Constituency,
                        as: 'constituency',
                        required: false
                    }]
                }]
            });
            return parties
        },
        findParties: async(parent, { query }, { models }) => {
            query = query.replace(/\s\s+/g, ' ');
            var components = query.split(" ");
            var where1 = [];
            var where2 = [];
            components.forEach(component => {
                where1.push({
                    name: {
                        $ilike: '%' + component + '%'
                    }
                })
                where2.push({
                    abbreviation: {
                        $ilike: '%' + component + '%'
                    }
                })
            });
            const parties = await models.Party.findAll({
                where: {
                    $or: [
                        where1,
                        where2
                    ]
                    
                },
                include: [{
                    model: models.Symbol,
                    as: 'symbol',
                    required: false,
                }],
                order: [
                    ['name', 'ASC']
                ]
            })
            return parties
        },
        dashboardStats: async(parent, context, { models }) => {
            var parties = await models.Party.find({
                raw: true,
                attributes: [
                    [models.sequelize.fn('COUNT', 'id'), 'count']
                ]
            });
            var constituencies = await models.Constituency.find({
                raw: true,
                attributes: [
                    [models.sequelize.fn('COUNT', 'id'), 'count']
                ]
            });
            var candidates = await models.Candidate.find({
                raw: true,
                attributes: [
                    [models.sequelize.fn('COUNT', 'id'), 'count']
                ]
            });
            var voters = await models.VotersDetail.find({
                raw: true,
                attributes: [
                    [models.sequelize.fn('SUM', models.sequelize.literal('male::bigint')), 'males'],
                    [models.sequelize.fn('SUM', models.sequelize.literal('female::bigint')), 'females'],
                ]
            });
            console.log(parties);
            console.log(candidates);
            console.log(constituencies);
            console.log(voters);
            return {
                parties: parties.count,
                constituencies: constituencies.count,
                candidates: candidates.count,
                voters: parseInt(voters.males) + parseInt(voters.females)
            }
        },
        partyStats: async(parent, { partyId }, { models }) => {
            var constituencyStats = await models.Constituency.findAll({
                raw: true,
                group: [
                    'assembly.id',
                    'assembly.name',
                    'assembly.abbreviation'
                ],
                attributes: [
                    'assembly.id',
                    'assembly.name',
                    'assembly.abbreviation',
                    [models.sequelize.fn('COUNT', 'id'), 'totalSeats'],
                ],
                include: [{
                    model: models.Assembly,
                    attributes: [],
                    as: 'assembly',
                    required: true
                }]
            })
            var partyStats = await models.Candidate.findAll({
                where: {
                    partyId: partyId,
                },
                raw: true,
                group: [
                    'constituency->assembly.id',
                    'constituency->assembly.name',
                    'constituency->assembly.abbreviation',
                ],
                attributes: [
                    'constituency->assembly.id',
                    'constituency->assembly.name',
                    'constituency->assembly.abbreviation',
                    [models.sequelize.fn('COUNT', 'constituency.assemblyId'), 'seats'],
                    [models.sequelize.fn('SUM', models.sequelize.col('status')), 'won']
                ],
                include: [{
                    model: models.Constituency,
                    attributes: [],
                    as: 'constituency',
                    required: false,
                    include: [{
                        model: models.Assembly,
                        attributes: [],
                        as: 'assembly',
                        required: true
                    }]
                }]
            })
            var finalStats = []
            constituencyStats.forEach((cStat) => {
                var finalStat = {
                    assembly: {
                        id: cStat.id,
                        name: cStat.name,
                        abbreviation: cStat.abbreviation
                    },
                    totalSeats: cStat.totalSeats
                }
                var found = false;
                partyStats.forEach((pStat) => {
                    if (cStat.id == pStat.id) {
                        found = true;
                        finalStat.seats = pStat.seats;
                        finalStat.won = pStat.won;
                        finalStat.lost = 0;
                        finalStat.awaited = pStat.seats;
                    }
                });
                if (!found) {
                    finalStat.seats = 0;
                    finalStat.won = 0;
                    finalStat.lost = 0;
                    finalStat.awaited = 0;
                }
                finalStats.push(finalStat);
            })
            return finalStats;
        }
    }
}