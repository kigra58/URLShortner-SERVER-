import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { route } from "./route/route";
import Path from "path";

config();
const app = express();

app.use("/", express.static("public"));
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  // const filePath = Path.join(__dirname, "public/index.html");
  // console.log("========,", filePath);
  // res.sendFile(filePath);
  res.send("Welcome");
});

app.use("/url", route);

app.listen(3021, () => {
  console.log("==========server running at port at 3021");
});
