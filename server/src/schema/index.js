import { mergeSchemas } from 'graphql-tools'
import usersSchema from './users'
import postsSchema from './posts'

const schema = mergeSchemas({
  schemas: [
    usersSchema,
    postsSchema,
  ],
})

export default schema
