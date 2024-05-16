
export const typeDefs = `#graphql

    enum Style {
        Jazz
        Pop
        Latin
        Evergreen
        Flamenco
    }

    enum Mood {
        Romantic
        Upbeat
    }

    enum Event {
        Wedding
        Cocktail Hour
        Ceremony
        Bar
        
    }

    type Song {
        id: ID!,
        name: String!,
        style: [Style!]!
        mood: [Mood!]
        event: [Event!]
    }

    type Query {
        songs: [Song],
        songByStyle(style: Style!): [Song]
        songByMood(mood: Mood!): [Song]
        songByEvent(event: Event!): [Song]
        songFilter (style: Style, mood: Mood, event: Event): [Song]
    }
`