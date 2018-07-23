module.exports = `

    type Assembly {
        id: Int!
        name: String!
        abbreviation: String!
    }

    type Constituency {
        id: Int!
        name: String!
        area: String!
        assembly: Assembly!
        votersDetail: VotersDetail
        candidates: [Candidate]
    }

    type VotersDetail {
        id: Int!
        constituency: Constituency!
        male: Int!
        female: Int!
    }

    type Query {
        findConstituencies(query: String!): [Constituency]
        constituencyDetails(constituencyId: Int!): Constituency
        assemblies: [Assembly]
        assemblyConstituencies(assemblyId: Int!): [Constituency]
    }
`;