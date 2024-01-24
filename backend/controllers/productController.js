import asyncHandler from '../middlewares/asyncHandler.js';
import Product from '../models/productModel.js';

const addProduct = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, quantity, brand } = req.fields;
    //validation
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

    const product = new Product({ ...req.fields });
    await product.save();
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const updateProductDetails = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, quantity, brand } = req.fields;
    //validation
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

const removeProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

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

export { addProduct, updateProductDetails, removeProduct, fetchProducts };
