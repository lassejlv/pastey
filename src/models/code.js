const mongoose = require("mongoose");
const marked = require("marked");

const CodeSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: [true, "ShortId is required, for the CodeSchema!"],
    },

    content: {
      type: String,
      required: [true, "Content is required, for the CodeSchema!"],
    },

    content_format: {
      type: String,
      required: [true, "ContentFormat is required, for the CodeSchema!"],
    },

    language: {
      type: String,
      required: [true, "Language is required, for the CodeSchema!"],
    },

    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

CodeSchema.pre("validate", function (next) {
  if (this.content) {
    this.content_format = marked(this.content);
  }

  next();
});

module.exports = mongoose.model("Code", CodeSchema);
