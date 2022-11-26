const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
    },

    username: {
      type: String,
      required: true,
    },

    provider: {
      type: String,
      required: true,
    },

    avatar: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
