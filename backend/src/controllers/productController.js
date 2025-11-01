import Product from '../models/Product.js';

export const getAllProducts = async (req, res) => {
  try {
    const { category, bestSeller, excludeCategories } = req.query;
    const query = {};
    
    // Handle category filter (takes priority over excludeCategories)
    if (category && category !== 'All') {
      query.category = category;
    } else if (excludeCategories) {
      // Handle excludeCategories - can be comma-separated list
      const excludeList = excludeCategories.split(',').map(cat => cat.trim());
      query.category = { $nin: excludeList };
    }
    
    // Handle bestSeller filter (can work with category or excludeCategories)
    if (bestSeller === 'true') {
      query.bestSeller = true;
    }
    
    console.log('Product Query:', JSON.stringify(query, null, 2));
    const products = await Product.find(query).sort({ createdAt: -1 });
    console.log(`Found ${products.length} products`);
    
    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: error.message,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching product',
      error: error.message,
    });
  }
};

