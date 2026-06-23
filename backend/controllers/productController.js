import Product from '../models/Product.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res, next) => {
  try {
    const { name, price, description, image, category, countInStock } = req.body;

    const product = new Product({
      name,
      price,
      user: req.user._id,
      image,
      category,
      countInStock,
      description,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    next(error);
  }
};

// @desc    Search products with typo tolerance
// @route   GET /api/products/search?q=query
// @access  Public
// @desc    Search products (Works locally and supports partial words)
// @route   GET /api/products/search?q=query
// @access  Public
export const searchProducts = async (req, res, next) => {
  try {
    const query = req.query.q;
    
    if (!query) {
      const products = await Product.find({}).limit(20);
      return res.json(products);
    }

    // Using standard MongoDB $regex for partial, case-insensitive matching
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: 'i' } }, // 'i' makes it case-insensitive
        { description: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } }
      ]
    }).limit(10);

    res.json(products);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res, next) => {
  try {
    const { name, price, description, image, category, countInStock } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      // Update fields if provided, otherwise keep existing
      product.name = name || product.name;
      product.price = price !== undefined ? price : product.price;
      product.description = description || product.description;
      product.image = image || product.image;
      product.category = category || product.category;
      product.countInStock = countInStock !== undefined ? countInStock : product.countInStock;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    next(error); // Passes to global error handler
  }
};