    import { ApolloServer } from "@apollo/server";
    import { startStandaloneServer } from "@apollo/server/standalone";

    //db
    import db from "./_db.js";

    //types
    import { typeDefs } from "./schema.js";
 
    const resolvers = { 
        Query: {
            songs() {
                return db.songs
            } ,
            songByStyle(_, args) {
                return db.songs.filter(song => song.style.includes(args.style))
            },
            songByMood(_, args) {
                return db.songs.filter(song => song.mood.includes(args.mood))
            },
            songByEvent(_, args) {
                return db.songs.filter(song => song.event.includes(args.event))
            },
            songFilter(_, args){
                return db.songs.filter(song => {
                    let matches = true
                    if(args.style){
                        mathes = matches && song.style.includes(args.style)
                    }
                    if (args.mood){
                        matches = matches && song.mood.includes(args.mood)
                    }
                    if (args.event){
                        matches = matches && song.event.includes(args.event)
                    }
                    return matches
                })

            }
        }
    }

    //server setup
    const PORT = 4000;
    const server = new ApolloServer({
        typeDefs,
        resolvers
    })


    const {url} = await startStandaloneServer(server, {
        listen: {port: PORT}
    })
    console.log(`Server ready at url:  ${url}, port: ${PORT}`) 