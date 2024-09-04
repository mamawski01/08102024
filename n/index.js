import express from "express";
import http from "http";

const app = express();
const PORT = 8000;
const localhostImage = `http://localhost:${PORT}/`;

app.use("/uploads", express.static("uploads"));
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json());
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(localhostImage);
});
