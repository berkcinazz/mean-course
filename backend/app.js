const express = require("express");
const bodyParser = require("body-parser");

const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../config.env') })
const mongoDbUser = process.env.MONGO_DB_USER_NAME;
const mongoDbPassword = process.env.MONGO_DB_PASSWORD;
const MONGO_DB_HOST_NAME = process.env.MONGO_DB_HOST_NAME;

const mongoose = require("mongoose");
const app = express();

const postsRoutes = require("./routes/posts");

mongoose.set('strictQuery', false);
mongoose
  .connect(
    `mongodb+srv://${mongoDbUser}:${mongoDbPassword}@${MONGO_DB_HOST_NAME}`
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS, PUT"
  );
  next();
});


app.use("/api/posts",postsRoutes);

module.exports = app;
