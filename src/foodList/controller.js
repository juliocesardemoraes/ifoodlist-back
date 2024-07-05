import { Foodlist } from "./schema.js";

export const createFoodlist = async (req, res) => {
  try {
    const { title, creator, image, restList, privacy } = req.body;

    if (!title || !creator)
      return res.status(400).json({ error: "Wrong input" });

    const newFoodlist = new Foodlist({
      title,
      creator,
      image,
      privacy,
      restList,
    });
    await newFoodlist.save();
    res.status(201).json(newFoodlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFoodlist = async (req, res) => {
  const { id } = req.query;

  if (id) {
    try {
      const foodlist = await Foodlist.findOne({ _id: id });
      return res.status(200).json(foodlist);
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  }

  try {
    const foodlist = await Foodlist.find();
    return res.status(200).json(foodlist);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const updateFoodlist = async (req, res) => {
  try {
    const { id } = req.query;
    const { restList } = req.body;

    const foodlist = await Foodlist.findById(id);

    if (!foodlist) {
      return res.status(404).json({ message: "Foodlist not found" });
    }

    foodlist.restList.push(restList); // Assuming restList is an array of restaurants

    const updatedFoodlist = await foodlist.save();
    res.status(200).json(updatedFoodlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
