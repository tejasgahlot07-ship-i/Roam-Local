import mongoose, { Schema } from "mongoose";

const tipSchema = new Schema(
  {
    author: {
      type: String,
      required: true,
      trim: true,
      maxLength: 60,
    },
    category: {
      type: String,
      default: "LOCAL TIP",
      trim: true,
      uppercase: true,
      maxLength: 30,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxLength: 80,
    },
    text: {
      type: String,
      required: true,
      trim: true,
      maxLength: 300,
    },
    upvotes: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Tip = mongoose.model("Tip", tipSchema);
