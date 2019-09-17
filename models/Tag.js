const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tagSchema = new Schema(
  {
    name: String,
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Tag = mongoose.model("Tag", tagSchema);
module.exports = Tag;
