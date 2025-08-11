import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// function for add product without sizes
const addProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      category,
      subCategory,
      bestseller,
      quantity,
    } = req.body;

    // Basic validation without sizes
    if (
      !name ||
      !price ||
      !description ||
      !category ||
      !subCategory ||
      !quantity
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields except sizes are required.",
      });
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
      date: Date.now(),
      // sizes removed here
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
