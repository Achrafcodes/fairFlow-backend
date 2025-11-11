import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();

app.use(express.json());

// connect mongo
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`server is listning to port ${process.env.PORT} 🚀`);
    });
  })
  .catch((error) => {
    console.log("error while connecting MONGODB", error);
  });
