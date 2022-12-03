import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  userID: String,
  xp: Number,
  warns: Array<{ authorID: String; reason: String }>(),
});

export default mongoose.model("Member", memberSchema);
