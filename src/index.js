import express from "express";
import cors from "cors";
import {
  createFoodlist,
  getFoodlist,
  updateFoodlist,
} from "./foodList/controller.js";

// If you want to connect to mongo uncomment the two lines below
// and add the connection string to the .env file

import { connectToMongo } from "./database/connect.js";
connectToMongo();

const app = express();
app.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);
app.use(express.json());

// Create a new foodlist
app.post("/foodlist", createFoodlist);

// Get all foodlists
app.get("/foodlist", getFoodlist);

// Update a foodlist (assuming :id is the foodlist ID)
app.put("/foodlist", updateFoodlist);

app.listen("4000");

export default app;
