import mongoose from "mongoose";

const notesSchema = new mongoose.Schema(
  {
    unit: {
      type: Number,
      required: true,
      enum: [1, 2, 3, 4, 5],
    },
    branch: {
      type: String,
      required: true,
      enum: ["ECE", "EX", "CSE", "IT", "AU"],
    },
    subject: {
      type: String,
      required: true,
    },
    fileLink: {
      type: String,
      required: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    approvals: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    status: {
      type: String,
      default: "pending",
    },
    expirationDate: {
      type: Date,
      required: true,
    },
    ratings: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        rating: {
          type: Number,
          min: 1,
          max: 5,
        },
      },
    ],
  },
  { timestamps: true }
);

export const Notes = mongoose.model("Notes", notesSchema);
