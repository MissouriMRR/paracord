import "reflect-metadata"
import * as TypeORM from "typeorm";
import * as TypeGraphQL from "type-graphql";

import {DroneResolver} from "./drone-resolver";
import {Drone} from "./drone";
import { ApolloServer } from 'apollo-server-express';

import express from 'express';
const graphqlHTTP = require('express-graphql');
import { createServer } from 'http';
import cors from 'cors';


async function bootstrap() {
    try {
        await TypeORM.createConnection();

        const schema = await TypeGraphQL.buildSchema({
            resolvers: [DroneResolver]
        });

        const app = express();
        const server = new ApolloServer({
            schema
        });

        app.use('*', cors());
        
        server.applyMiddleware({ app, path: '/graphql' });
        const httpServer = createServer(app);
        httpServer.listen(
            { port: 3000 },
            (): void => console.log(`\n🚀      GraphQL is now running on http://localhost:3000/graphql`)
        );
    } catch (err) {
        console.error(err);
    }
}

bootstrap();