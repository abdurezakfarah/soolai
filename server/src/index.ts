import express, { type Request, type Response } from "express";
import cors from "cors";
import connectDB from "./mongodb/connect.js";
import dalleRoutes from "./routes/dalleRoutes.js";
import postRoutes from "./routes/postRoutes.js";

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/dalle", dalleRoutes);
app.use("/api/v1/posts", postRoutes);

app.get("/api/test", (_request: Request, response: Response) => {
  response.status(200).json({
    message: "hello",
  });
});

const startServer = () => {
  try {
    connectDB(process.env.MONGODB_URL as string);

    app.listen(process.env.port || port, () => {
      console.log(`listining port ${port}`);
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};

startServer();
