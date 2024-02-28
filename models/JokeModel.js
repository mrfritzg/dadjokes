import mongoose from "mongoose";

const JokeSchema = new mongoose.Schema(
  {
    body: String,
    like: {
      type: Number,
      default: 0,
    },
    dislike: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    userFavorite: {
      type: [String],
      default: ["admin"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Joke", JokeSchema);
