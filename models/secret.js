const mongoose = require("mongoose");

const secretSchema = new mongoose.Schema(
  {
    hash: {
      type: String,
      unique: true,
      required: [true, "Hash is required"],
    },
    secretText: {
      type: String,
      required: [true, "Secret text is required"],
    },
    expiresAt: {
      type: Date,
      required: [true, "Expiration time is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Secret = mongoose.model("Secret", secretSchema);

module.exports = Secret;
