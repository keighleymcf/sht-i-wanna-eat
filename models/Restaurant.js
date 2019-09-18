const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurantSchema = new Schema(
  {
    yelpId: String,
    name: String,
    display_address: Array,
    latitude: Number,
    longitude: Number,
    categories: Array,
    price: String,
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    tried: Boolean
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
