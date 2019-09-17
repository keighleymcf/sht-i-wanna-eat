const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurantSchema = new Schema(
  {
    /* list: objectId /* parent list id , */
    googleId: String /* ? format? */,
    name: String,
    cuisine: Array,
    priceRange: String /* ?? double check */,
    openNow: Boolean /* ?? double check */,
    address: String /* ?? double check */
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
module.exports = List;
