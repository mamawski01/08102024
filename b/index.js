import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import http from "http";

import router from "./src/routes/routes.js";

dotenv.config();
const PORT = process.env.PORT || process.env.API_PORT;
const localhost 
= `http://localhost:${PORT}/`;

const app = express();
app.use(express.json());
app.use(cors());

const server = http.createServer(app);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(PORT, () => {
      console.log(localhost + " connected to db");
    });
  })
  .catch((err) => {
    console.log("Db and server fail" + err);
  });

app.use("/", router);
