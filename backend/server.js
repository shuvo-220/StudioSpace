
import "dotenv/config";
import app from "./app.js";
import connectDB from "./db/db.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
  }
};

if (process.env.NODE_ENV !== "production") {
  startServer();
}

export default app;
