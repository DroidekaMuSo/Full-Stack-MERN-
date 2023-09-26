import express from "express";
import displayRoutes from "express-routemap";
import mongoose from "mongoose";
import cors from "cors";

import booksRouter from "./routers/books.router.js";

import { MONGO_URL, PORT } from "./config/constants.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"]
  })
);

app.get("/welcome", (req, res) => {
  try {
    console.log(req);

    return res.status(234).send("Welcome to MERN stack tutorial");
  } catch (error) {
    console.log("🚀 ~ file: index.js:11 ~ app.get ~ error:", error);
  }
});

app.use("/books", booksRouter);

mongoose
  .connect(MONGO_URL)
  .then((con) => {
    console.log("Database connected");
  })
  .then((con) => {
    app.listen(PORT, () => {
      console.log(`API running on port ${PORT}`);
      displayRoutes(app);
    });
  })
  .catch((err) => {
    console.log("🚀 ~ file: index.js:27 ~ mongoose.connect ~ err:", err);
  });
