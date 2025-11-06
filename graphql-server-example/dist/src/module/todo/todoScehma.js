const todoSchema = `#graphql
type Todo {
    id: ID!
    title: String!
    completed: Boolean!
    createdAt: String!
}

type Query {
  todos: [Todo]
}

`;
export default todoSchema;
