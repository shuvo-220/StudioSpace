import "dotenv/config";
import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";

import { auth } from "./auth/auth.js";
import { connectAuthDB } from "./db/db.js";
import connectDB from "./db/db.js";

import studio from "./routes/studioRoute.js";
import booking from "./routes/bookingRoute.js";

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://frontend-eta-orcin-54.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(async (req, res, next) => {
  try {
    await Promise.all([connectDB(), connectAuthDB()]);
    next();
  } catch (error) {
    next(error);
  }
});

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());
app.use("/api", studio);
app.use("/api", booking);

app.get("/", (req, res) => {
  res.send("StudioSpace API is running!");
});

export default app;
