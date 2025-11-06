import { gql, type TypedDocumentNode } from "@apollo/client";
import type {
  CreateTodoMutation,
  CreateTodoMutationVariables,
  GetTodosQuery,
  UpdateTodoMutation,
  UpdateTodoMutationVariables,
} from "./types/__generated__/graphql";

// const GET_ROCKET_INVENTORY: TypedDocumentNode<
//   GetRocketInventoryQuery,
//   GetRocketInventoryQueryVariables
// > = gql`
//   query GetRocketInventory($year: Int!) {
//     rocketInventory(year: $year) {
//       id
//       model
//       year
//       stock
//     }
//   }
// `;

// function RocketInventory() {
//   // ❌ TypeScript Error: Expected 2 arguments, but got 1.
//   const { data } = useQuery(GET_ROCKET_INVENTORY);

//   // ❌ TypeScript Error: Property 'variables' is missing in type '{}'
//   const { data } = useQuery(GET_ROCKET_INVENTORY, {});

//   // ❌ TypeScript Error: Property 'year' is missing in type '{}'
//   const { data } = useQuery(GET_ROCKET_INVENTORY, { variables: {} });

//   // ✅ Correct: Required variable provided
//   const { data } = useQuery(GET_ROCKET_INVENTORY, {
//     variables: { year: 2024 },
//   });

//   // ❌ TypeScript Error: Type 'string' is not assignable to type 'number'
//   const { data } = useQuery(GET_ROCKET_INVENTORY, {
//     variables: { year: "2024" },
//   });

//   // ❌ TypeScript Error: 'notAVariable' does not exist in type '{ id: string }'
//   const { data } = useQuery(GET_ROCKET_INVENTORY, {
//     variables: { year: "2024", notAVariable: true },
//   });
// }
export const GET_TODOS: TypedDocumentNode<GetTodosQuery> = gql`
  query GetTodos {
    todos {
      id
      todo

      completed
      createdAt
    }
  }
`;

export const CREATE_TODO: TypedDocumentNode<
  CreateTodoMutation,
  CreateTodoMutationVariables
> = gql`
  mutation CreateTodo($todo: String!) {
    createTodo(todo: $todo) {
      id
      todo
      completed
      createdAt
    }
  }
`;

export const UPDATE_TODO: TypedDocumentNode<
  UpdateTodoMutation,
  UpdateTodoMutationVariables
> = gql`
  mutation UpdateTodo($id: ID!, $completed: Boolean!) {
    updateTodo(id: $id, completed: $completed) {
      id
      todo
      completed
      createdAt
    }
  }
`;

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      message
    }
  }
`;
