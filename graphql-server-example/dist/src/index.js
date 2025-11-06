import express from "express";
import "dotenv/config";
import cors from "cors";
import apolloServer from "./config/apolloServer.js";
import { expressMiddleware } from "@as-integrations/express5";
const app = express();
const PORT = process.env.PORT || 8000;
// Core middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:3000",
        "https://studio.apollographql.com",
    ],
    credentials: true,
}));
// Optional: small helper to extract bearer token
function getBearerToken(authHeader) {
    if (!authHeader)
        return null;
    const [scheme, token] = authHeader.split(" ");
    if (scheme?.toLowerCase() !== "bearer" || !token)
        return null;
    return token;
}
// Routes
app.get("/", (_req, res) => {
    res.send("Hello, GraphQL Server!");
});
const startApolloServer = async () => {
    await apolloServer.start();
    app.use("/graphql", expressMiddleware(apolloServer, {
        context: async ({ req }) => {
            const authHeader = req.headers["authorization"];
            const token = getBearerToken(authHeader ?? null);
            // If you want to verify a JWT, decode it here and attach user info
            // Example (requires jsonwebtoken):
            // let user: null | { userId: string } = null;
            // if (token) {
            //   try {
            //     const decoded = jwt.verify(token, process.env.JWT_SECRET!);
            //     user = { userId: (decoded as any).sub || (decoded as any).userId };
            //   } catch (e) {
            //     // invalid token; keep user as null
            //   }
            // }
            return {
                token,
                // user,
                // You can also pass prisma here instead of importing it directly in resolvers:
                // prisma,
            };
        },
    }));
    app.listen(PORT, () => {
        console.log(`🚀 Server is running at http://localhost:${PORT}`);
        console.log(`📊 GraphQL endpoint: http://localhost:${PORT}/graphql`);
    });
};
startApolloServer();
