import Express, { Request, Response } from "express";
import cors from "cors";

import aboutRoutes from "../modules/about/about.routes";

const PORT = process.env.PORT || 3010;

const app = Express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Routes
app.use("/api", aboutRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
