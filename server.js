require("dotenv").config({ debug: true });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 8000;
const env = process.env;
const uri = env.MONGODB_URI;

//MONCODBと繋げる
mongoose.connect(uri);
mongoose.connection.once("open", () => {
  console.log("db connected");
});

//コースエラー回避
app.use(cors());
//express使う
app.use(express.json());

// CORSを有効化;
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  next();
});

//それぞれのページのroutesを指定
const usersRouter = require("./routes/users");
const blogsRouter = require("./routes/blogs");
const booksRouter = require("./routes/books");
const s3urlRouter = require("./routes/s3url");

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
