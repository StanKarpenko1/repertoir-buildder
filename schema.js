
export const typeDefs = `#graphql

    enum Style {
        jazz
        pop
        latin
        evergreen
        flamenco
    }

    enum Mood {
        romantic
        upbeat
    }

    enum Event {
        wedding
        cocktail_hour
        ceremony
        bar  
    }

    enum Performance {
        solo
        backing_track
        looper_ready
        looper
    }

    enum Progress {
        ready
        not_ready
        needs_practice
    }

    type Song {
        id: ID!,
        name: String!,
        style: [Style!]
        mood: [Mood!]
        event: [Event!]
        performance: [Performance!]
        progress: Progress
        notes: String
    }

    
    type Query {
        songs: [Song]
        songFilter (

            name: String
            style: Style
            mood: Mood
            event: Event
            performance: Performance
            progress: Progress
            

             ): [Song]
    }
`