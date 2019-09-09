import { GraphQLServer } from 'graphql-yoga'
import schema from './schema'
import { db } from './data/initdb'
const PORT = 4000

db.sync({ force: false });

const server = new GraphQLServer({
  schema,
})

server.start({ port: PORT }, () => {
	console.log(`Server started on port ${PORT} => http://localhost:${PORT}`)
})
