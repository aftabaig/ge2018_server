module.exports = {
    Query: {
        findCandidates: async(parent, { query }, { models }) => {
            query = query.replace(/\s\s+/g, ' ');
            var components = query.split(" ");
            var where = [];
            components.forEach(component => {
                where.push({
                    fullName: {
                        $ilike: '%' + component + '%'
                    }
                })
            });
            const candidates = await models.Candidate.findAll({
                where: {
                    $and: where
                },
                order: [
                    ['fullName', 'ASC']
                ],
                include: [{
                    model: models.Constituency,
                    as: 'constituency',
                    required: true
                }, {
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
            })
            return candidates
        },
        findCandidatesByName: async(parent, { name }, { models }) => {
            const candidates = await models.Candidate.findAll({
                where: {
                    fullName: name
                },
                order: [
                    ['fullName', 'ASC']
                ],
                include: [{
                    model: models.Constituency,
                    as: 'constituency',
                    required: true
                }, {
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
            })
            return candidates
        },
        partyCandidates: async(parent, { partyId }, { models }) => {
            const candidates = await models.Candidate.findAll({
                where: {
                    partyId: partyId
                },
                order: [
                    ['fullName', 'ASC']
                ],
                include: [{
                    model: models.Constituency,
                    as: 'constituency',
                    required: true
                }, {
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
            })
            return candidates;
        },
        constituencyCandidates: async(parent, { constituencyId }, { models }) => {
            const candidates = await models.Candidate.findAll({
                where: {
                    constituencyId: constituencyId
                },
                order: [
                    ['fullName', 'ASC']
                ],
                include: [{
                    model: models.Constituency,
                    as: 'constituency',
                    required: true
                }, {
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
            })
            return candidates
        }
    }
}