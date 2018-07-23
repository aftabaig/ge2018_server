module.exports = `

    type Candidate {
        id: Int!
        fullName: String!
        score: Int
        constituency: Constituency!
        symbol: Symbol
        party: Party
    }

    type Query {
        findCandidates(query: String!): [Candidate]
        findCandidatesByName(name: String!): [Candidate]
        partyCandidates(partyId: Int!): [Candidate]
        constituencyCandidates(constituencyId: Int!): [Candidate]
    }

`;