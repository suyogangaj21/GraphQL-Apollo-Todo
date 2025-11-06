import prisma from "../../config/database.js";
function requireAuth(ctx) {
    if (!ctx.token) {
        // Or check ctx.user if you verify JWT and attach a user
        throw new Error("Unauthorized");
    }
}
const todoResolver = {
    Query: {
        todos: async (_parent, _args, _ctx) => {
            return prisma.todo.findMany({
                orderBy: { createdAt: "desc" },
            });
        },
    },
    Mutation: {
        createTodo: async (_, { todo }, ctx) => {
            requireAuth(ctx);
            const newTodo = await prisma.todo.create({
                data: {
                    todo,
                    completed: false,
                },
            });
            return newTodo;
        },
        updateTodo: async (_, { id, completed }, ctx) => {
            requireAuth(ctx);
            const updatedTodo = await prisma.todo.update({
                where: { id: parseInt(id) },
                data: { completed },
            });
            return updatedTodo;
        },
        deleteTodo: async (_, { id }, ctx) => {
            requireAuth(ctx);
            const deletedTodo = await prisma.todo.delete({
                where: { id: parseInt(id) },
            });
            return { message: `${deletedTodo.id} deleted successfully` };
        },
    },
};
export default todoResolver;
