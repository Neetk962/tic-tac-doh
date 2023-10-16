/* IMPORT MODULES */
require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const authMiddleware = require('./utils/auth');
const { createServer } = require('http');
const { Server } = require('socket.io');

/* IMPORT SCHEMAS */
const { typeDefs, resolvers } = require('./schemas');

/* IMPORT DATABASE AND DEFINE APOLLO-SERVER */
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
});
const SOCKETPORT = process.env.SOCKET_PORT || 3002;
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: '*',
    },
});
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
httpServer.listen(SOCKETPORT, () => {
    console.log(`Socket.IO server running at http://localhost:${SOCKETPORT}/`);
});

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
    await server.start();
    server.applyMiddleware({ app });

    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`API server running on port ${PORT}!`);
            console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
        })
    })
};

/* START SERVER */
startApolloServer();