    import { ApolloServer } from "@apollo/server";
    import { startStandaloneServer } from "@apollo/server/standalone";

    //db
    import db from "./_db.js";

    //types
    import { typeDefs } from "./schema.js";
 
    const resolvers = { 
        Query: {
            // retrieve all songs
            songs() {
                return db.songs
            } ,

            // get the info about specific song
            getSongInfo(_, args) {
                const song =  db.songs.find(song => song.name.toLowerCase() === args.name.toLowerCase())
                if (!song){
                    return null
                }
                return song 
            },

            // get the list by parameters
            songFilter(_, args){
                return db.songs.filter(song => {

                    let matches = true
                    if(args.style){
                        matches = matches && song.style.includes(args.style)
                    }
                    if (args.mood){
                        matches = matches && song.mood.includes(args.mood)
                    }
                    if (args.event){
                        matches = matches && song.event.includes(args.event)
                    }
                    if (args.performance){
                        matches = matches && song.performance.includes(args.performance)
                    }
                    if (args.progress){
                        matches = matches && song.progress === args.progress
                    }
                    return matches
                })
            }
        },
        Mutation: {
            deleteSong (_, args) {
                db.songs = db.songs.filter((s) => s.id !== parseInt(args.id, 10));
                return db.songs
            },
            addSong (_, args) {
                let newSong = {
                    ...args.song,
                    id: Math.floor(Math.random() * 10000)
                }
                db.songs.push(song)

                return song

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