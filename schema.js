
export const typeDefs = `#graphql
    type Song {
        id: ID!,
        name: String!,
        style: [String!]!
    }

    type Query {
        songs: [Song]
    }
`