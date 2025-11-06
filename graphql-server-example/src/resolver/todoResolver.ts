import prisma from "../config/database.js";

type Context = {
  token: string | null;
  // user?: { userId: string } | null;
};

function requireAuth(ctx: Context) {
  if (!ctx.token) {
    // Or check ctx.user if you verify JWT and attach a user
    throw new Error("Unauthorized");
  }
}

const todoResolver = {
  Query: {
    todos: async (_parent: any, _args: any, _ctx: Context) => {
      return prisma.todo.findMany({
        orderBy: { createdAt: "desc" },
      });
    },
  },
  Mutation: {
    createTodo: async (_: any, { todo }: { todo: string }, ctx: Context) => {
      requireAuth(ctx);
      const newTodo = await prisma.todo.create({
        data: {
          todo,
          completed: false,
        },
      });
      return newTodo;
    },
    updateTodo: async (
      _: any,
      { id, completed }: { id: string; completed: boolean },
      ctx: Context
    ) => {
      requireAuth(ctx);
      const updatedTodo = await prisma.todo.update({
        where: { id: parseInt(id) },
        data: { completed },
      });
      return updatedTodo;
    },
    deleteTodo: async (_: any, { id }: { id: string }, ctx: Context) => {
      requireAuth(ctx);
      const deletedTodo = await prisma.todo.delete({
        where: { id: parseInt(id) },
      });
      return { message: `${deletedTodo.id} deleted successfully` };
    },
  },
};

export default todoResolver;
