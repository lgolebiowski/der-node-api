import express from "express";
import path from "path";
import router from "./router";
import { protect } from "./auth/auth";
import { createNewUser, signIn } from "./user";

const app = express();

app.use(express.json());
app.use(express.static("static"));
app.use("/api", protect, router);

app.get("/", (req, res) => {
  res.sendFile(path.resolve("pages/index.html"));
});

app.post("/signup", createNewUser);
app.post("/signin", signIn);

export default app;
