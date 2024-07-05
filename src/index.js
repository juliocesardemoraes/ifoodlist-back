import express from "express";
import cors from "cors";
import {
  createFoodlist,
  getFoodlist,
  updateFoodlist,
} from "./foodList/controller.js";
import { connectToMongo } from "./database/connect.js";
import {
  createRestaurant,
  getRestaurant,
  updateRestaurant,
} from "./restaurant/controller.js";

// If you want to connect to mongo uncomment the two lines below
// and add the connection string to the .env file

connectToMongo();

const app = express();
app.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);
app.use(express.json());

app.post("/foodlist", createFoodlist);
app.get("/foodlist", getFoodlist);
app.put("/foodlist", updateFoodlist);

app.post("/restaurant", createRestaurant);
app.get("/restaurant", getRestaurant);
app.put("/restaurant", updateRestaurant);

app.listen("4000");

export default app;
