    import { ApolloServer } from "@apollo/server";
    import { startStandaloneServer } from "@apollo/server/standalone";

    //db
    import db from "./_db.js";

    console.log(db.songs)

    //types
    import { typeDefs } from "./schema.js";

    const resolvers = {
        Query: {
            songs() {
                return db.songs
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