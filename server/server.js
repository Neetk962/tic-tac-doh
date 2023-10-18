/* IMPORT MODULES */
require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const authMiddleware = require('./utils/auth');
const { createServer } = require('http');
const { Server } = require('socket.io');
const roomWorker = require("./utils/roomWorker");

/* IMPORT SCHEMAS */
const { typeDefs, resolvers } = require('./schemas');

/* IMPORT DATABASE AND DEFINE APOLLO-SERVER */
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
});

/* SOCKET.IO SERVER SETUP */
// const SOCKETPORT = process.env.SOCKET_PORT || 3002;
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: '*',
    },
});
io.on('connection', (socket) => {
    console.log('A user has connected to', socket.id);
    roomWorker(io, socket, rooms);
    socket.on('disconnect', () => {
        console.log('A user has disconnected from', socket.id);
    });
});
// httpServer.listen(SOCKETPORT, () => {
//     console.log(`Socket.IO server running at http://localhost:${SOCKETPORT}/`);
// });

/* MIDDLEWARE */
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

/* SETUP APOLLO-SERVER */
const startApolloServer = async () => {
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });

    db.once('open', () => {
        httpServer.listen(PORT, () => {
            console.log(`API and Socket.IO server running on port ${PORT}!`);
            console.log(`Use GraphQL at http://localhost:${PORT}${httpServer.graphqlPath}`);
        })
    })
};

/* START SERVER */
startApolloServer();