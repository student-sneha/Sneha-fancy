import React, { useState, useEffect } from "react";
import axios from "axios";
import { assets } from "../assets/assets";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [bestseller, setBestseller] = useState(false);
  const [subCategory, setSubCategory] = useState("Earrings");
  const [quantity, setQuantity] = useState("");
  const [sizes, setSizes] = useState(["Free Size"]);

  const sizeRequiredSubCategories = ["Sports Bra", "Innerwear"];

  const subCategories = [
    "Earrings",
    "Necklaces",
    "Bangles",
    "Rings",
    "Mangalsutra",
    "Lipsticks",
    "Makeup Kits",
    "Bags",
    "Accessories",
    "Beauty Tools",
    "Nail Paint",
    "Jewelry",
  ];

  useEffect(() => {
    if (sizeRequiredSubCategories.includes(subCategory)) {
      setSizes([]); // allow size selection
    } else {
      setSizes(["Free Size"]); // fixed for non-clothing
    }
  }, [subCategory]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", "Women");
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("quantity", quantity);

      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);

      const response = await axios.post(`${backendUrl}/api/product/add`, formData, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setPrice("");
        setQuantity("");
        setBestseller(false);
        setSubCategory("Earrings");
        setSizes(["Free Size"]);
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-4">

      {/* Image Upload */}
      <div>
        <p className="mb-2 font-semibold">Upload Product Images</p>
        <div className="flex gap-2">
          {[image1, image2, image3, image4].map((img, i) => (
            <label htmlFor={`image${i + 1}`} key={i}>
              <img
                className="w-20 h-20 object-cover border"
                src={!img ? assets.upload_area : URL.createObjectURL(img)}
              />
              <input
                type="file"
                id={`image${i + 1}`}
                hidden
                onChange={(e) => [setImage1, setImage2, setImage3, setImage4][i](e.target.files[0])}
              />
            </label>
          ))}
        </div>
      </div>

      {/* Product Name */}
      <div className="w-full">
        <p>Product Name</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter product name"
          required
          className="w-full max-w-[500px] border px-3 py-2"
        />
      </div>

      {/* Description */}
      <div className="w-full">
        <p>Product Description</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter product description"
          required
          className="w-full max-w-[500px] border px-3 py-2"
        />
      </div>

      {/* Category & Price */}
      <div className="flex flex-wrap gap-6 w-full">
        <div>
          <p>Subcategory</p>
          <select
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="border px-3 py-2"
          >
            {subCategories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <p>Price (₹)</p>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border px-3 py-2"
            placeholder="Enter price"
            required
          />
        </div>

        <div>
          <p>Quantity</p>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="border px-3 py-2"
            placeholder="Enter quantity"
            required
          />
        </div>
      </div>

      {/* Sizes */}
      <div>
        <p className="mb-2">Product Size</p>
        {sizeRequiredSubCategories.includes(subCategory) ? (
          <div className="flex gap-2">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <p
                key={size}
                onClick={() =>
                  setSizes((prev) =>
                    prev.includes(size)
                      ? prev.filter((s) => s !== size)
                      : [...prev, size]
                  )
                }
                className={`cursor-pointer px-3 py-1 border rounded ${
                  sizes.includes(size) ? "bg-pink-200" : "bg-slate-200"
                }`}
              >
                {size}
              </p>
            ))}
          </div>
        ) : (
          <p className="px-3 py-1 bg-slate-200 inline-block">Free Size</p>
        )}
      </div>

      {/* Bestseller Checkbox */}
      <div className="flex items-center gap-2 mt-2">
        <input
          type="checkbox"
          checked={bestseller}
          onChange={() => setBestseller((prev) => !prev)}
          id="bestseller"
        />
        <label htmlFor="bestseller">Add to Best Seller</label>
      </div>

      {/* Submit Button */}
      <button type="submit" className="mt-4 bg-black text-white px-6 py-3 rounded">
        ADD
      </button>
    </form>
  );
};

export default Add;
