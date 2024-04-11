const express = require("express");
const cors = require("cors");
const dbjson = require("./items-db.json");
const { response } = require("express");

const { graphqlHTTP } = require("express-graphql");
const gql = require("graphql-tag");
const { buildASTSchema } = require("graphql");

const app = express();

app.use(cors({ origin: "*", credentials: true }));

app.use("images", express.static("public"));

const schema = buildASTSchema(gql(`
type Query{
    hello : String!,
    merchandise : [Merchandise]
},
type Merchandise{
    id : ID
    name : String
    description : String 
    lastBid : Float
    lastBidUser : String
    imageUrl : String
}
`));

const rootValue = {
    hello: () => "Hello World",
    merchandise : ()=> dbjson
}

app.use("/", graphqlHTTP({ schema, rootValue }));

app.listen(3000,
    () => {
        console.log("Server started and listing on port 3000...");
    }
);



