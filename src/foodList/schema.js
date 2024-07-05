import mongoose from "mongoose";

const { Schema } = mongoose;

const restaurantSchema = new Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  rank: { type: Number, required: true },
  link: { type: String, required: true },
  image: { type: String, required: true },
});

const foodlistSchema = new Schema({
  title: { type: String, required: true },
  creator: { type: String, required: true },
  image: { type: String, required: true },
  privacy: { type: String, default: "public", required: true },
  restList: { type: [restaurantSchema], default: [], required: false },
});

const Foodlist = mongoose.model("Foodlist", foodlistSchema);
const Restaurant = mongoose.model("Restaurant", restaurantSchema);

export { Foodlist, Restaurant };
