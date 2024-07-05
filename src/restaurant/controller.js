import { Restaurant } from "../foodList/schema.js";

export const createRestaurant = async (req, res) => {
  try {
    const { title, type, rank, image, link } = req.body;

    if (!title || !type || !rank || !image || !link)
      return res.status(400).json({ error: "Wrong input" });

    const newRestaurant = new Restaurant({
      title,
      type,
      rank,
      image,
      link,
    });
    await newRestaurant.save();
    res.status(201).json(newRestaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRestaurant = async (req, res) => {
  const { id } = req.query;

  if (id) {
    try {
      const foodlist = await Restaurant.findOne({ _id: id });
      return res.status(200).json(foodlist);
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  }

  try {
    const foodlist = await Restaurant.find();
    return res.status(200).json(foodlist);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const updateRestaurant = async (req, res) => {
  try {
    const { id } = req.query;
    const { restList } = req.body;

    const foodlist = await Restaurant.findById(id);

    if (!foodlist) {
      return res.status(404).json({ message: "Foodlist not found" });
    }

    Restaurant.restList.push(restList);

    const updatedFoodlist = await Restaurant.save();

    res.status(200).json(updatedFoodlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
