import { mergeSchemas } from 'graphql-tools'
import usersSchema from './users'
import postsSchema from './posts'
import categoriesSchema from './categories'
import userInterestedInPost from './userInterestedInPost'

const schema = mergeSchemas({
  schemas: [
    usersSchema,
    postsSchema,
    categoriesSchema,
    userInterestedInPost,
  ],
})

export default schema
