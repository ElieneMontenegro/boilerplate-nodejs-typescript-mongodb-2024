import "dotenv/config";
import express from "express";

import router from "./routes";

require("./database/connection");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
