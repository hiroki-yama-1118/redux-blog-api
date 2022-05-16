require("dotenv").config({ debug: true });
import express, { json } from "express";
import { connect, connection } from "mongoose";
import cors from "cors";
const app = express();
const port = 8000;
const env = process.env;
const uri = env.MONGODB_URI;

//MONCODBと繋げる
connect(uri);
connection.once("open", () => {
  console.log("db connected");
});

//コースエラー回避
app.use(cors());
//express使う
app.use(json());

//それぞれのページのroutesを指定
import usersRouter from "./routes/users";
import blogsRouter from "./routes/blogs";
import booksRouter from "./routes/books";
import s3urlRouter from "./routes/s3url";

//ルーターに読み込まれる
app.use("/users", usersRouter);
app.use("/blogs", blogsRouter);
app.use("/books", booksRouter);
app.use("/s3url", s3urlRouter);

//テスト
app.get("/", (req, res) => {
  res.send("Hello world");
});

//サーバーを立ち上げる
app.listen(process.env.PORT || port, () => {
  console.log(`listening port ${port}`);
});
