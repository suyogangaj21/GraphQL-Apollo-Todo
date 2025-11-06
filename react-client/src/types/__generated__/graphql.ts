export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Mutation = {
  __typename: "Mutation";
  createTodo: Todo;
  deleteTodo: ResponseType;
  updateTodo: Maybe<Todo>;
};

export type MutationCreateTodoArgs = {
  todo: Scalars["String"]["input"];
};

export type MutationDeleteTodoArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationUpdateTodoArgs = {
  completed: Scalars["Boolean"]["input"];
  id: Scalars["ID"]["input"];
};

export type Query = {
  __typename: "Query";
  todos: Maybe<Array<Maybe<Todo>>>;
};

export type ResponseType = {
  __typename: "ResponseType";
  message: Scalars["String"]["output"];
};

export type Todo = {
  __typename: "Todo";
  completed: Scalars["Boolean"]["output"];
  createdAt: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  todo: Scalars["String"]["output"];
};

export type GetTodosQueryVariables = Exact<{ [key: string]: never }>;

export type GetTodosQuery = {
  todos: Array<{
    __typename: "Todo";
    id: string;
    todo: string;
    completed: boolean;
    createdAt: string;
  } | null> | null;
};

export type CreateTodoMutationVariables = Exact<{
  todo: Scalars["String"]["input"];
}>;

export type CreateTodoMutation = {
  createTodo: {
    __typename: "Todo";
    id: string;
    todo: string;
    completed: boolean;
    createdAt: string;
  };
};

export type UpdateTodoMutationVariables = Exact<{
  id: Scalars["ID"]["input"];
  completed: Scalars["Boolean"]["input"];
}>;

export type UpdateTodoMutation = {
  updateTodo: {
    __typename: "Todo";
    id: string;
    todo: string;
    completed: boolean;
    createdAt: string;
  } | null;
};

export type DeleteTodoMutationVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type DeleteTodoMutation = {
  deleteTodo: { __typename: "ResponseType"; message: string };
};
