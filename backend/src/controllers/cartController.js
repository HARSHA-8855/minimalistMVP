import Cart from '../models/Cart.js';

// Get user's cart
export const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.userId }).populate('items.productId');
    
    if (!cart) {
      cart = await Cart.create({ user: req.user.userId, items: [] });
    }

    res.status(200).json({
      success: true,
      data: cart.items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching cart',
      error: error.message,
    });
  }
};

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { productId, name, price, imageUrl, quantity = 1 } = req.body;

    let cart = await Cart.findOne({ user: req.user.userId });

    if (!cart) {
      cart = await Cart.create({ user: req.user.userId, items: [] });
    }

    // Check if item already exists
    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (existingItemIndex >= 0) {
      // Update quantity
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      cart.items.push({ productId, name, price, imageUrl, quantity });
    }

    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Item added to cart',
      data: cart.items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding to cart',
      error: error.message,
    });
  }
};

// Update item quantity
export const updateCartItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findOne({ user: req.user.userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found',
      });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart',
      });
    }

    if (quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
    }

    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Cart updated',
      data: cart.items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating cart',
      error: error.message,
    });
  }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.user.userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found',
      });
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Item removed from cart',
      data: cart.items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error removing from cart',
      error: error.message,
    });
  }
};

// Clear cart
export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found',
      });
    }

    cart.items = [];
    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Cart cleared',
      data: [],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error clearing cart',
      error: error.message,
    });
  }
};

// Sync guest cart with user cart
export const syncCart = async (req, res) => {
  try {
    const { guestCartItems } = req.body;

    let cart = await Cart.findOne({ user: req.user.userId });

    if (!cart) {
      cart = await Cart.create({ user: req.user.userId, items: [] });
    }

    // Merge guest cart items with user cart
    if (guestCartItems && Array.isArray(guestCartItems)) {
      guestCartItems.forEach((guestItem) => {
        const existingItemIndex = cart.items.findIndex(
          (item) => item.productId.toString() === guestItem.productId
        );

        if (existingItemIndex >= 0) {
          cart.items[existingItemIndex].quantity += guestItem.quantity || 1;
        } else {
          cart.items.push({
            productId: guestItem.productId,
            name: guestItem.name,
            price: guestItem.price,
            imageUrl: guestItem.imageUrl,
            quantity: guestItem.quantity || 1,
          });
        }
      });
    }

    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Cart synced successfully',
      data: cart.items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error syncing cart',
      error: error.message,
    });
  }
};

