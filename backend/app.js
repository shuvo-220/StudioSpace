import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";

import { auth } from "./auth/auth.js";
import studio from "./routes/studioRoute.js";

const app = express();

// CORS configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// Better Auth handler - must be before express.json()
app.all("/api/auth/*splat", toNodeHandler(auth));

// JSON middleware
app.use(express.json());

// Studio routes
app.use("/api", studio);

// Test route
app.get("/", (req, res) => {
  res.send("StudioSpace API is running!");
});

export default app;