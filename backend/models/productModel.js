import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: Array, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  sizes: { type: Array },  // Conditionally required
  quantity: { type: Number },
  bestseller: { type: Boolean },
  date: { type: Date, default: Date.now },
});

// ✅ Pre-validation hook for conditional size requirement
productSchema.pre("validate", function (next) {
  const requiredSizeCategories = ["Topwear", "Bottomwear", "Winterwear"];

  if (requiredSizeCategories.includes(this.subCategory)) {
    if (!Array.isArray(this.sizes) || this.sizes.length === 0) {
      return next(new Error("Sizes are required for clothing subcategories (Topwear, Bottomwear, Winterwear)."));
    }
  }

  // ✅ Don't auto-assign for other categories since you're providing it manually like ["One Size"]
  next();
});

const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
