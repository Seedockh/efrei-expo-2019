import express from 'express';
import bodyParser from 'body-parser';
import cors from "cors";
import marked from "marked";
import fs from "fs";
import iconv from 'iconv-lite';
import encodings from 'iconv-lite/encodings';
import { GraphQLServer } from 'graphql-yoga'
import schema from './schema'
import { db } from './data/initdb'
const port = process.env.PORT || 8080;

iconv.encodings = encodings;

db.sync({ force: false });

const server = new GraphQLServer({
  schema,
})

server.get("/api", (request, response) => {
  const file = fs.readFileSync("../README.md", 'utf8');
  response.send(marked(file.toString()));
});

server.start({port: port}, () => {
	console.log(`Server started on port ${port}`)
})
