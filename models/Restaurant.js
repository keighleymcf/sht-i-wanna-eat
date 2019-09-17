const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurantSchema = new Schema(
  {
    yelpId: String,
    name: String,
    display_address: Array,
    categories: Array,
    price: String,
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    // TAGS NEEDS TO BE ARRAY
    tags: {
      type: Schema.Types.ObjectId,
      ref: "Tag"
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
module.exports = Restaurant;
