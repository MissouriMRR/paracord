import { ApolloServer } from "apollo-server-express"
import cors from "cors"
import express from "express"
import { createServer } from "http"
import "reflect-metadata"
import { buildSchema } from "type-graphql"
import { createConnection } from "typeorm"

const port = 3000

console.log("Connecting to database")
createConnection()
    .then(async connection => {
        console.log("Building schemas")
        const gqlschema = await buildSchema({
            resolvers: [`${__dirname}/**/*resolver.ts`],
        })

        console.log("Creating express app")
        const app = express()
        app.use("*", cors())

        console.log("Initializing server")
        const server = new ApolloServer({
            schema: gqlschema,
        })
        server.applyMiddleware({
            app,
            path: "/graphql",
        })

        console.log("Starting http server. Hold on to your potatoes!")
        const httpServer = createServer(app)
        httpServer.listen({
            port: port,
        })
    })
    .catch((error: any) => {
        console.error(error)
    })
