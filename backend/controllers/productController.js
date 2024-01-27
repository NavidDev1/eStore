import asyncHandler from '../middlewares/asyncHandler.js';
import Product from '../models/productModel.js';

const addProduct = asyncHandler(async (req, res) => {
  try {
    // Destructuring fields from request
    const { name, description, price, category, quantity, brand } = req.fields;

    //validation checks
    switch (true) {
      case !name:
        return res.json({ error: 'Name i required' });
      case !brand:
        return res.json({ error: 'Brand i required' });
      case !description:
        return res.json({ error: 'Description i required' });
      case !price:
        return res.json({ error: 'Price i required' });
      case !quantity:
        return res.json({ error: 'Quantity i required' });
      case !category:
        return res.json({ error: 'Category i required' });
    }

    // Create a new product and save to database
    const product = new Product({ ...req.fields });
    await product.save();
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

// Update product details by ID
const updateProductDetails = asyncHandler(async (req, res) => {
  try {
    // Destructuring fields from request
    const { name, description, price, category, quantity, brand } = req.fields;

    //validation checks
    switch (true) {
      case !name:
        return res.json({ error: 'Name i required' });
      case !brand:
        return res.json({ error: 'Brand i required' });
      case !description:
        return res.json({ error: 'Description i required' });
      case !price:
        return res.json({ error: 'Price i required' });
      case !quantity:
        return res.json({ error: 'Quantity i required' });
      case !category:
        return res.json({ error: 'Category i required' });
    }

    // Find and update product details by ID
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.fields },
      { new: true }
    );

    await product.save();

    res.json(product);
  } catch (error) {
    console.error;
    res.status(400).json(error.message);
  }
});

// Remove product by ID
const removeProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Fetch products with optional keyword search
const fetchProducts = asyncHandler(async (req, res) => {
  try {
    const pageSize = 6;
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: 'i' } }
      : {};

    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword }).limit(pageSize);

    res.json({
      products,
      page: 1,
      pages: Math.ceil(count / pageSize),
      hasMore: false,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// fetching product by ID
const fetchProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    //if we have the product we will show it, else show an error.
    if (product) {
      return res.json(product);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: 'Product not found' });
  }
});

const addProductReview = asyncHandler(async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        res.status(400);
        throw new Error('Product already reviewed');
      }

      const review = {
        name: req.user.username,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);

      product.numReviews = product.reviews.length;

      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: 'Review added' });
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const fetchAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({})
      .populate('category')
      .limit(12)
      .sort({ createAt: -1 });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'SErver Error' });
  }
});

export {
  addProduct,
  updateProductDetails,
  removeProduct,
  addProductReview,
  fetchProductById,
  fetchProducts,
  fetchAllProducts,
};
