import React, { useContext, useEffect, useState, useCallback } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = useCallback(() => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    setFilterProducts(productsCopy);
  }, [products, showSearch, search, subCategory]);

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;

      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;

      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [subCategory, search, showSearch, applyFilter]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
     <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t relative">

      {/* --- FILTER DRAWER (Mobile Only) --- */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-white z-50 p-5 border-r border-gray-300 transform transition-transform duration-300 sm:hidden ${
          showFilter ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <p className="text-xl font-semibold">Filters</p>
          <button onClick={() => setShowFilter(false)} className="text-xl">×</button>
        </div>
        <p className="mb-3 text-sm font-medium">TYPE</p>
        <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
          {[
            "Earrings", "Necklaces", "Bangles", "Rings", "Mangalsutra",
            "Jewelry", "Accessories", "Bags", "Lipsticks", "Makeup Kits",
            "Beauty", "Nail Paint",
          ].map((type) => (
            <label key={type} className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={type}
                onChange={toggleSubCategory}
                checked={subCategory.includes(type)}
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      {/* --- LEFT FILTER PANEL (Desktop) --- */}
      <div className="min-w-60 hidden sm:block">
        <p className="my-2 text-xl font-semibold">FILTER</p>
        <div className="border border-gray-300 pl-5 py-3 mt-3">
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {[
              "Earrings", "Necklaces", "Bangles", "Rings", "Mangalsutra",
              "Jewelry", "Accessories", "Bags", "Lipsticks", "Makeup Kits",
              "Beauty", "Nail Paint",
            ].map((type) => (
              <label key={type} className="flex gap-2">
                <input
                  type="checkbox"
                  className="w-3"
                  value={type}
                  onChange={toggleSubCategory}
                  checked={subCategory.includes(type)}
                />
                {type}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* --- PRODUCT LISTING --- */}
      <div className="flex-1 px-4 sm:px-0">
        {/* Header with Filter and Sort */}
        <div className="flex justify-between text-base sm:text-2xl mb-4 items-center">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />

          <div className="flex gap-3 items-center">
            {/* Show Filter button on small screens */}
            <button
              onClick={() => setShowFilter(true)}
              className="sm:hidden px-4 py-2 border border-gray-400 rounded text-sm"
            >
              Filter
            </button>

            <select
              onChange={(e) => setSortType(e.target.value)}
              value={sortType}
              className="border-2 border-gray-300 text-sm px-2 py-1"
            >
              <option value="relavent">Sort by: Relevant</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {filterProducts.length === 0 ? (
          <p className="text-gray-500 text-center">No products found.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
            {filterProducts.map((item, idx) => (
              <ProductItem
                key={idx}
                name={item.name}
                price={item.price}
                image={item.image}
                id={item._id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Collection;
