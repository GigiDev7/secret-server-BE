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
      type: String,
      required: [true, "Expiration time is required"],
    },
  },
  {
    timestamps: true,
  }
);

secretSchema.virtual("iv").get(function () {
  const ind = this.hash.indexOf("-");
  return this.hash.slice(ind + 1);
});

const Secret = mongoose.model("Secret", secretSchema);

module.exports = Secret;
