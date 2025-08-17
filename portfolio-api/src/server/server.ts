import Express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import connectDB from "../config/db";

import homeRoutes from "../modules/home/home.routes";
import aboutRoutes from "../modules/about/about.routes";

dotenv.config({
  path: path.resolve(__dirname, "..", "config", "config.env"),
});

const PORT = process.env.PORT || 3010;

connectDB();

const app = Express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Routes
// Centralized route management
app.use("/api", homeRoutes);

// Independent route management
app.use("/api", aboutRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
