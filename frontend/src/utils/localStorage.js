export const getCartItems = () => {
  try {
    const items = localStorage.getItem('cart');
    return items ? JSON.parse(items) : [];
  } catch (error) {
    console.error('Error loading cart:', error);
    return [];
  }
};

export const saveCartItems = (items) => {
  try {
    localStorage.setItem('cart', JSON.stringify(items));
  } catch (error) {
    console.error('Error saving cart:', error);
  }
};

export const clearCart = () => {
  try {
    localStorage.removeItem('cart');
  } catch (error) {
    console.error('Error clearing cart:', error);
  }
};

