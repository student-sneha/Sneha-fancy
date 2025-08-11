import userModel from "../models/userModel.js";

// Add product to user cart (no sizes)
const addToCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { itemId } = req.body;

    if (!itemId) {
      return res.status(400).json({ success: false, message: "Item ID required" });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Ensure cartData exists
    if (!userData.cartData) {
      userData.cartData = new Map();
    }

    // Handle Map type properly
    const currentQuantity = userData.cartData.get(itemId) || 0;
    userData.cartData.set(itemId, currentQuantity + 1);

    await userData.save();

    res.json({ 
      success: true, 
      message: "Product added to cart", 
      cartData: Object.fromEntries(userData.cartData) 
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to add product to cart" });
  }
};

// Update product quantity in user cart
const updateCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { itemId, quantity } = req.body;

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (!userData.cartData) {
      userData.cartData = new Map();
    }

    if (quantity <= 0) {
      userData.cartData.delete(itemId);
    } else {
      userData.cartData.set(itemId, quantity);
    }

    await userData.save();

    res.json({ 
      success: true, 
      message: "Cart updated successfully", 
      cartData: Object.fromEntries(userData.cartData) 
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get user cart data
const getUserCart = async (req, res) => {
  try {
    const userId = req.userId;

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData ? Object.fromEntries(userData.cartData) : {};
    
    res.json({ success: true, cartData });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart };
