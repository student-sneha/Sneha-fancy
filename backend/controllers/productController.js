import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// function for add product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      category,
      subCategory,
      sizes,
      bestseller,
      quantity,
    } = req.body;

    // ✅ Basic validation
    if (
      !name ||
      !price ||
      !description ||
      !category ||
      !subCategory ||
      !sizes ||
      !quantity
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields including sizes and quantity are required.",
      });
    }

    // ✅ Parse sizes (even for non-clothing)
    let parsedSizes;

    const sizeRequiredSubCategories = ["Topwear", "Bottomwear", "Winterwear"];

    try {
      parsedSizes = JSON.parse(sizes);

      if (!Array.isArray(parsedSizes) || parsedSizes.length === 0) {
        // If subcategory is clothing, size is required
        if (sizeRequiredSubCategories.includes(subCategory)) {
          throw new Error(
            "Sizes must be a non-empty array for clothing subcategories."
          );
        } else {
          // If not clothing, assign default
          parsedSizes = ["Free Size"];
        }
      }
    } catch (err) {
      // If JSON parse fails
      if (sizeRequiredSubCategories.includes(subCategory)) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid sizes format. Must be a non-empty JSON array for clothing items.",
        });
      } else {
        parsedSizes = ["Free Size"];
      }
    }

    const image1 = req.files.image1?.[0];
    const image2 = req.files.image2?.[0];
    const image3 = req.files.image3?.[0];
    const image4 = req.files.image4?.[0];

    const images = [image1, image2, image3, image4].filter(Boolean);

    let imageUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      price: Number(price),
      description,
      category,
      subCategory,
      bestseller: bestseller === "true",
      image: imageUrl,
      quantity: Number(quantity),
      sizes: parsedSizes,
      date: Date.now(),
    };

    try {
      const product = new productModel(productData);
      const savedProduct = await product.save();
      res.json({ success: true, message: "Product added" });
    } catch (err) {
      console.error("❌ Error saving product:", err.message);
      res.status(400).json({ success: false, message: err.message });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
// function for list product
const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// function for removing product
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// function for single product
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { listProduct, singleProduct, addProduct, removeProduct };
