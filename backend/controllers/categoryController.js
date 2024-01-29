// Importing the Category model and asyncHandler middleware
import Category from '../models/categoryModel.js';
import asyncHandler from '../middlewares/asyncHandler.js';

// Creating the createCategory controller
const createCategory = asyncHandler(async (req, res) => {
  try {
    // Destructuring the 'name' property from the request body
    const { name } = req.body;

    // Checking if the 'name' is not provided in the request body
    if (!name) return res.json({ error: 'Name is required' });

    // Checking if a category with the provided name already exists
    const existingCategory = await Category.findOne({ name });

    // If the category already exists, return an error
    if (existingCategory) return res.json({ error: 'Already exists' });

    // Creating a new Category instance and saving it to the database
    const category = await new Category({ name }).save();

    // Sending the created category as a JSON response
    res.json(category);
  } catch (error) {
    // Logging any error that occurs during the process
    console.log(error);

    // Sending a 400 status code and the error as a JSON response
    res.status(400).json(error);
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    const { categoryId } = req.params;

    const category = await Category.findOne({ _id: categoryId });

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    category.name = name;

    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const removeCategory = asyncHandler(async (req, res) => {
  try {
    const removed = await Category.findOneAndDelete({
      _id: req.params.categoryId,
    });
    if (!removed) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(removed);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const listCategory = asyncHandler(async (req, res) => {
  try {
    const all = await Category.find({});
    res.json(all);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
});

const readCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.id });
    res.json(category);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
});

// Exporting the createCategory controller
export {
  createCategory,
  updateCategory,
  removeCategory,
  listCategory,
  readCategory,
};
