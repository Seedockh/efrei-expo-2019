import { mergeSchemas } from 'graphql-tools'
import usersSchema from './users'
import postsSchema from './posts'
import categoriesSchema from './categories'

const schema = mergeSchemas({
  schemas: [
    usersSchema,
    postsSchema,
    categoriesSchema,
  ],
})

export default schema
