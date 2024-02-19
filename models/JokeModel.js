import mongoose from "mongoose";

const JokeSchema = new mongoose.Schema(
  {
    body: String,
    jokeLike: Number,
    jokeDislike: Number,
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    userFavorite: {
      type: String,
      enum: ["admin"],
      default: "admin",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Joke", JokeSchema);
