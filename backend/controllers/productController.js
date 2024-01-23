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

export { addProduct, updateProductDetails };
