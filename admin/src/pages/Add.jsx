import React from "react";
import { assets } from "../assets/assets";
import { useState,useEffect } from "react";
import axios from "axios";
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
  const [category, setCategory] = useState("Women");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [sizes, setSizes] = useState([]);
  const [quantity, setQuantity] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const fromData = new FormData();

      fromData.append("name", name);
      fromData.append("description", description);
      fromData.append("price", price);
      fromData.append("category", category);
      fromData.append("subCategory", subCategory);
      fromData.append("bestseller", bestseller);
      fromData.append("sizes", JSON.stringify(sizes));
      fromData.append("quantity", quantity);

      image1 && fromData.append("image1", image1);
      image2 && fromData.append("image2", image2);
      image3 && fromData.append("image3", image3);
      image4 && fromData.append("image4", image4);

      /*------- To send all the from data through the api we use axios -----------*/

      const response = await axios.post(
        backendUrl + "/api/product/add",
        fromData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setPrice("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const sizeRequiredSubCategories = ["Topwear", "Bottomwear", "Winterwear"];

  // Whenever subCategory changes, adjust size accordingly
  useEffect(() => {
    if (!sizeRequiredSubCategories.includes(subCategory)) {
      setSizes(["Free Size"]);
    } else {
      setSizes([]); // reset if switching back
    }
  }, [subCategory]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-3"
    >
      <div>
        <p className="mb-2">Upload Image</p>

        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              className="w-20"
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
            />
          </label>
          <label htmlFor="image2">
            <img
              className="w-20"
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
            />
          </label>
          <label htmlFor="image3">
            <img
              className="w-20"
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
            />
          </label>
          <label htmlFor="image4">
            <img
              className="w-20"
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              hidden
            />
          </label>
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Type here"
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Product description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Write content here.."
          required
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 "
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className="mb-2"> Sub category</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full px-3 py-2"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
            <option value="Accessories">Accessories</option>
            <option value="Beauty">Beauty</option>
            <option value="Bags">Bags</option>
            <option value="Jewelry">Jewelry</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Product Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full px-3 py-2 sm:w-[120px]"
            type="Number"
            placeholder="25"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-8">
        <div>
          <p className="mb-3 ">Product Sizes</p>
          {sizeRequiredSubCategories.includes(subCategory) ? (
            <div className="flex gap-3">
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <div
                  key={size}
                  onClick={() =>
                    setSizes((prev) =>
                      prev.includes(size)
                        ? prev.filter((item) => item !== size)
                        : [...prev, size]
                    )
                  }
                >
                  <p
                    className={`${
                      sizes.includes(size) ? "bg-pink-100" : "bg-slate-200"
                    } px-3 py-1 cursor-pointer`}
                  >
                    {size}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="px-3 py-1 bg-slate-200 inline-block">Free Size</p>
          )}
        </div>

        <div>
          <p className="mb-2">Product Quantity</p>
          <input
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full px-2 py-2 sm:w-[120px]"
            type="number"
          />
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <input
          onChange={() => setBestseller((prev) => !prev)}
          checked={bestseller}
          type="checkbox"
          id="bestseller"
        />
        <label htmlFor="bestseller" className="cursor-pointer">
          Add to best Seller
        </label>
      </div>

      <button type="submit" className="w-28 py-3 mt-4 bg-black text-white">
        ADD
      </button>
    </form>
  );
};

export default Add;
