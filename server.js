import "dotenv/config";

import express from "express";

import initConnection from "./DB/connection.js";
import AppError from "./src/utils/appError.js";
import { globalError } from "./src/utils/globalError.js";
import userRoutes from "./src/modules/users/user.routes.js";
const app = express();
const port = 3000;
app.use(express.json());

initConnection();
app.use("/user", userRoutes);
app.get("/", (req, res) => res.send("Hello World!"));

app.use("*", (req, res, next) => {
  next(new AppError("invalid URL", 404))
});

app.use(globalError)

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
