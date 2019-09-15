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
const AWS = require('aws-sdk');

const port = process.env.PORT || 8080;

const s3 = new AWS.S3({
  accessKeyId:'AKIA2R3F245T2JFKKNB4',
  secretAccessKey:'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',
  region:'eu-west-3'
});

const params = {Bucket: 'test-bucket-tutorial', Key: 'images/myimage.jpg', ContentType: 'image/jpeg'};

s3.getSignedUrl('putObject', params, function (err, url) {
    console.log('Your generated pre-signed URL is', url);
});

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
