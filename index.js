import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// db
import db from "./_db.js";

// types
import { typeDefs } from "./schema.js";

const resolvers = { 
    Query: {
        // retrieve all songs
        songs() {
            return db.songs;
        },

        // get the info about a specific song
        getSongInfo(_, args) {
            const song = db.songs.find(song => song.name.toLowerCase() === args.name.toLowerCase());
            if (!song) {
                return null;
            }
            return song;
        },

        // get the list by parameters
        songFilter(_, args) {
            return db.songs.filter(song => {
                let matches = true;
                if (args.name && args.name.length > 0) {
                    matches = matches && args.name.some(m => song.name.includes(m));
                }
                if (args.style && args.style.length > 0) {
                    matches = matches && args.style.some(m => song.style.includes(m));
                }
                if (args.mood && args.mood.length > 0) {  
                    matches = matches && args.mood.some(m => song.mood.includes(m));
                }
                if (args.event) {
                    matches = matches && args.event.some(m => song.event.includes(m));
                }
                if (args.performance) {
                    matches = matches && args.performance.some(m => song.performance.includes(m));
                }
                if (args.progress) {
                    matches = matches && args.progress.some(m => song.progress.includes(m));
                }
                return matches;
            });
        }
    },
    Mutation: {
        deleteSong(_, args) {
            db.songs = db.songs.filter((s) => s.id !== parseInt(args.id, 10));
            return db.songs;
        },
        addSong(_, args) {
            let newSong = {
                ...args.song,
                id: Math.floor(Math.random() * 10000)
            };
            db.songs.push(newSong);

            return newSong;
        }
    }
};

// server setup
const PORT = 4000;
const server = new ApolloServer({
    typeDefs,
    resolvers
});

const { url } = await startStandaloneServer(server, {
    listen: { port: PORT }
});
console.log(`Server ready at url: ${url}, port: ${PORT}`);
