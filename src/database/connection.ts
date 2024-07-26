import mongoose from "mongoose";

var uri = `mongodb+srv://lilamontenegro:lilamontenegro@twinder.aqxjqxj.mongodb.net/twinder_test`;

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
