import express, { json } from 'express';
import cors from 'cors';

import gql from "graphql-tag";
import { ApolloServer } from '@apollo/server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { expressMiddleware } from '@apollo/server/express4';
import { readFileSync } from "fs";
import { ApolloServerPluginInlineTraceDisabled } from '@apollo/server/plugin/disabled';

import { resolvers } from "./graphql/resolvers.js"
import { schema } from "./graphql/schema.js"
import { connectDB } from './config/db_connection.js';

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
try {
    await connectDB()
} catch (error) {
    console.log(error)
}

const typeDefs = gql(
    // We cannot use this because in Vercel serverless deployment, 
    // fs module doesn't work, so we directly import whole schema string
    // readFileSync("./graphql/schema.graphql", {
    //     encoding: "utf-8",
    // })
    schema
);

const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
    plugins: [ApolloServerPluginInlineTraceDisabled()],
});
// Note you must call `start()` on the `ApolloServer`
// instance before passing the instance to `expressMiddleware`
await server.start();

// Specify the path to mount the server
app.use(
    '/graphql',
    cors(),
    json(),
    expressMiddleware(server),
);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

