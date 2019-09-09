import { mergeSchemas } from 'graphql-tools'
import userSchema from './users'

const schema = mergeSchemas({
  schemas: [
    userSchema,
  ],
})

export default schema
