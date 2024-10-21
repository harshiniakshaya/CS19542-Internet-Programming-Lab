// services/recycleService.js
const Recycle = require("../models/Recycle");
const User = require("../models/User");

const createRecycle = async (recycleData) => {
  try {
    const newRecycle = new Recycle(recycleData);
    await newRecycle.save();
    return newRecycle;
  } catch (error) {
    throw new Error("Error creating recycle: " + error.message);
  }
};

const getAllRecycles = async () => {
  try {
    const recycles = await Recycle.find();
    const baseUrl = `http://localhost:8080/`;
    const recyclesWithDetails = await Promise.all(
      recycles.map(async (recycle) => {
        const user = await User.findOne({ userId: recycle.userId });

        return {
          ...recycle.toObject(),
          picture: baseUrl + recycle.picture.replace(/\\/g, "/"),
          userName: user ? user.name : "Unknown User",
        };
      })
    );
    return recyclesWithDetails;
  } catch (error) {
    throw new Error("Error fetching recycles: " + error.message);
  }
};

const getRecycleById = async (id) => {
  try {
    const recycle = await Recycle.findById(id);
    if (!recycle) {
      throw new Error("Recycle not found");
    }
    return recycle;
  } catch (error) {
    throw new Error("Error fetching recycle: " + error.message);
  }
};

const getRecyclesByUserId = async (userId) => {
  try {
    const recycles = await Recycle.find({ userId });
    const baseUrl = `http://localhost:8080/`;
    const recyclesWithDetails = await Promise.all(
      recycles.map(async (recycle) => {
        const user = await User.findOne({ userId: recycle.userId });

        return {
          ...recycle.toObject(),
          picture: baseUrl + recycle.picture.replace(/\\/g, "/"),
          userName: user ? user.name : "Unknown User",
        };
      })
    );
    return recyclesWithDetails;
  } catch (error) {
    throw new Error("Error fetching recycles by userId: " + error.message);
  }
};

const updateRecycle = async (id, recycleData) => {
  try {
    const updatedRecycle = await Recycle.findByIdAndUpdate(id, recycleData, {
      new: true,
    });
    if (!updatedRecycle) {
      throw new Error("Recycle not found for update");
    }
    return updatedRecycle;
  } catch (error) {
    throw new Error("Error updating recycle: " + error.message);
  }
};

const deleteRecycle = async (id) => {
  try {
    const deletedRecycle = await Recycle.findByIdAndDelete(id);
    if (!deletedRecycle) {
      throw new Error("Recycle not found for deletion");
    }
    return deletedRecycle;
  } catch (error) {
    throw new Error("Error deleting recycle: " + error.message);
  }
};

module.exports = {
  createRecycle,
  getAllRecycles,
  getRecycleById,
  updateRecycle,
  deleteRecycle,
  getRecyclesByUserId,
};
