module.exports = {
    Query: {
        assemblyConstituencies: async(parent, { assemblyId }, { models }) => {
            const constituencies = await models.Constituency.findAll({
                order: [
                    ['id', 'ASC']
                ],
                where: {
                    assemblyId: assemblyId
                },
                include: [{
                    model: models.Assembly,
                    as: 'assembly',
                    required: true,
                }, {
                    model: models.Candidate,
                    as: 'candidates',
                    required: false,
                    include: [{
                        model: models.Party,
                        as: 'party',
                        required: false,
                        include: [{
                            model: models.Symbol,
                            as: 'symbol',
                            required: true
                        }]
                    }, {
                        model: models.Symbol,
                        as: 'symbol',
                        required: false
                    }]
                }]
            });
            return constituencies;
        },
        assemblies: async(parent, context, { models}) => {
            const assemblies = await models.Assembly.findAll()
            return assemblies
        },
        findConstituencies: async(parent, { query }, { models }) => {
            query = query.replace(/\s\s+/g, ' ');
            var components = query.split(" ");
            var where1 = [];
            var where2 = []
            components.forEach(component => {
                where1.push({
                    name: {
                        $ilike: '%' + component + '%'
                    }
                });
                where2.push({
                    area: {
                        $ilike: '%' + component + '%'
                    }
                });
            });
            const constituencies = await models.Constituency.findAll({
                where: {
                    $or: [
                        where1, 
                        where2
                    ]
                },
                order: [
                    ['name', 'ASC']
                ]
            })
            return constituencies
        },
        constituencyDetails: async(parent, { constituencyId }, { models }) => {
            const constituency = models.Constituency.findOne({
                where: {
                    id: constituencyId
                },
                include: [{
                    model: models.VotersDetail,
                    as: 'votersDetail',
                    required: false
                }]
            });
            if (constituency.votersDetail == null) {
                constituency.votersDetail = {
                    male: 0,
                    female: 0
                }
            }
            return constituency
        }
    }
}