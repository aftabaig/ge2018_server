module.exports = `

    type Party {
        id: Int!
        name: String!
        abbreviation: String!
        symbol: Symbol!,
        candidates: [Candidate]
    }

    type PartyStats {
        assembly: Assembly!
        seats: Int!
        totalSeats: Int!
        won: Int!
        lost: Int!
        awaited: Int!
    }

    type DashboardStats {
        constituencies: Int!
        parties: Int!
        candidates: Int!
        voters: Int!
    }

    type Query {
        dashboardStats: DashboardStats
        findParties(query: String!): [Party]
        parties: [Party]
        partyStats(partyId: Int!): [PartyStats]
    }
`;