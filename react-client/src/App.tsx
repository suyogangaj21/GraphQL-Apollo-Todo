import { useMutation, useQuery } from "@apollo/client/react";
import { useState } from "react";
import { CREATE_TODO, DELETE_TODO, GET_TODOS, UPDATE_TODO } from "./queries";

interface Todo {
  __typename: "Todo";
  id: string;
  todo: string;
  completed: boolean;
  createdAt: string;
}

export default function App() {
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  // Query
  const { loading, error, data } = useQuery(GET_TODOS);

  // Mutations
  const [createTodo, { loading: createLoading }] = useMutation(CREATE_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
    onCompleted: () => setNewTodo(""),
  });

  const [updateTodo] = useMutation(UPDATE_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });

  const [deleteTodo] = useMutation(DELETE_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });

  // Handlers
  const handleCreateTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      await createTodo({
        variables: { todo: newTodo.trim() },
      });
    } catch (err) {
      console.error("Error creating todo:", err);
    }
  };

  const handleToggleComplete = async (id: string, completed: boolean) => {
    try {
      await updateTodo({
        variables: { id, completed: !completed },
      });
    } catch (err) {
      console.error("Error updating todo:", err);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    if (!confirm("Are you sure you want to delete this todo?")) return;

    try {
      await deleteTodo({
        variables: { id },
      });
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };

  const startEditing = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.todo);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditText("");
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error)
    return (
      <div className="p-8 text-center text-red-500">Error: {error.message}</div>
    );
  if (!data) return <div className="p-8 text-center">No data available</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        📋 Todo Manager
      </h1>

      {/* Add Todo Form */}
      <form onSubmit={handleCreateTodo} className="mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo..."
            className="flex-1 px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={createLoading}
          />
          <button
            type="submit"
            disabled={createLoading || !newTodo.trim()}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {createLoading ? "Adding..." : "Add Todo"}
          </button>
        </div>
      </form>

      {/* Todo List */}
      <div className="space-y-2">
        {data.todos?.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No todos yet. Add one above! ✨
          </div>
        ) : (
          data.todos
            ?.filter((todo): todo is Todo => todo !== null) // Filter out nulls
            ?.map(
              (
                todo // Now todo is guaranteed to be Todo, not null
              ) => (
                <div
                  key={todo.id}
                  className={`p-4 border rounded-lg transition-all duration-200 ${
                    todo.completed
                      ? "bg-green-50 border-green-200"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      {/* Checkbox */}
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() =>
                          handleToggleComplete(todo.id, todo.completed)
                        }
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />

                      {/* Todo Text */}
                      {editingId === todo.id ? (
                        <div className="flex gap-2 flex-1">
                          <input
                            type="text"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className="flex-1 px-3 py-1 border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                // You can implement edit functionality here
                                cancelEditing();
                              } else if (e.key === "Escape") {
                                cancelEditing();
                              }
                            }}
                          />
                          <button
                            onClick={cancelEditing}
                            className="px-3 py-1 text-gray-500 hover:text-gray-700"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex-1">
                          <span
                            className={`text-lg ${
                              todo.completed
                                ? "line-through text-gray-500"
                                : "text-gray-800"
                            }`}
                          >
                            {todo.todo}
                          </span>
                          <div className="text-sm text-gray-400 mt-1">
                            Created:{" "}
                            {new Date(
                              parseInt(todo.createdAt)
                            ).toLocaleDateString()}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    {editingId !== todo.id && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEditing(todo)}
                          className="px-3 py-1 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                          title="Edit todo"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDeleteTodo(todo.id)}
                          className="px-3 py-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                          title="Delete todo"
                        >
                          🗑️
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )
            )
        )}
      </div>

      {/* Statistics */}
      {data.todos && data.todos.length > 0 && (
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Total: {data.todos.length}</span>
            <span>
              Completed: {data.todos.filter((t) => t && t.completed).length}
            </span>
            <span>
              Pending: {data.todos.filter((t) => t && !t.completed).length}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
