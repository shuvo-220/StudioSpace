import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";

import { auth } from "./auth/auth.js";
import studio from "./routes/studioRoute.js";
import booking from "./routes/bookingRoute.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.json());
app.use("/api", studio);
app.use("/api", booking);

app.get("/", (req, res) => {
  res.send("StudioSpace API is running!");
});

export default app;

