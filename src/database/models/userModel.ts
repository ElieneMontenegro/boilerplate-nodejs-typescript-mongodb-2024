"use strict";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  discord_tag: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  chars: {
    type: [String],
    required: false,
  },
});

const userModel = mongoose.model("users", userSchema);

export default userModel;
