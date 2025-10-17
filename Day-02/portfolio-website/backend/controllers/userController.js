import { getUserData } from "../processors/userProcessor.js";

export const getProfile = (req, res) => {
  try {
    const data = getUserData();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
