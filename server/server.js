const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const authMiddleware = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT;
const app = express();
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

