import { GraphQLServer } from 'graphql-yoga'
import schema from './schema'

/*
import mongoose from 'mongoose'
mongoose.connect('mongodb://gwen:efrei1@ds217078.mlab.com:17078/efreibook', {
  useNewUrlParser: true,
  useMongoClient: true,
  autoIndex: false, // Don't build indexes
  reconnectTries: 100, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0
});
const User = mongoose.model('User', new mongoose.Schema({ name: String }))
*/

const server = new GraphQLServer({
  schema,
})

const PORT = 4000;
server.start({ port: PORT }, () => {
	console.log(`Server started on port ${PORT} => http://localhost:${PORT}`)
})
