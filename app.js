
const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } =  require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const path =  require('path');
const { fileLoader, mergeTypes, mergeResolvers } = require('merge-graphql-schemas');
const models = require('./db/models');
const auth = require("./src/auth");

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './src/schema')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './src/resolvers')));

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

const app = express();

app.use(auth);
app.use('/symbols', express.static('./public/symbols'));
app.use(
    '/graphql',
    bodyParser.json(),
    graphqlExpress(request => {
        return {
            schema: schema,
            context: {
                models: models,
                user: request.user,
                auth: {
                    isAuthenticated: request.isAuthenticated,
                    scope: request.scope
                }
            }
        }
    })
);
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));    
app.listen(8081);
module.exports = app;