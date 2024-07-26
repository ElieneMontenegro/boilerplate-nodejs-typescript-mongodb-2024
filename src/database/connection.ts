import mongoose from "mongoose";

var uri =
  process.env.AMBIENTE == "prod"
    ? process.env.MONGO_URL_PROD
    : process.env.MONGO_URL_DEV;

mongoose.connect(uri, {}).then(
  () => {
    console.log("Database connection established!");
  },
  (err: any) => {
    {
      console.log("Error connecting Database instance due to:", err);
    }
  }
);
