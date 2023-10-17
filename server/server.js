/* IMPORT MODULES */
require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const authMiddleware = require('./utils/auth');
/* IMPORT SCHEMAS */
const { typeDefs, resolvers } = require('./schemas');

/* IMPORT DATABASE AND DEFINE APOLLO-SERVER */
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const serverSocket = require('http').createServer(app);
const io = require('socket.io')(serverSocket, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
});

io.on("connection", socket => {
    // socket.on('reqTurn', (data) => {
    //     const room = JSON.parse(data).room
    //     io.to(room).emit('playerTurn', data)
    // })
    console.log(socket.id);
    socket.on('send-message', (room) => {
        socket.to(room);
    })
    socket.on('join-room', room => {
        socket.join(room)
    })
    socket.on('join-room', (room, cb) => {
        socket.join(room);
        cb(`Joined ${room}`)
    })
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