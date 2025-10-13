import React from "react";
import { Link } from "react-router-dom";

const DropDown = ({
  categoriesData,
  handleCategoryClick,
  dropDownProducts,
}) => {
  return (
    <div className="absolute top-full left-0 w-[300px] bg-white shadow-lg z-20 mt-1 rounded overflow-hidden">
      {categoriesData.map((category) => (
        <div
          key={category.id}
          className="p-3 cursor-pointer hover:bg-gray-100 flex items-center gap-2"
          onClick={() => handleCategoryClick(category.title)}
        >
          <img
            src={category.image_Url}
            alt={category.title}
            className="w-8 h-8 rounded"
          />
          <span>{category.title}</span>
        </div>
      ))}

      {/* Products inside same block */}
      {dropDownProducts.length > 0 && (
        <div className="border-t max-h-[300px] overflow-y-auto">
          {dropDownProducts.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.name.replace(/\s+/g, "-")}`}
            >
              <div className="flex items-center gap-2 p-2 hover:bg-gray-50">
                <img
                  src={product.image_Url[0].url}
                  alt={product.name}
                  className="w-10 h-10 rounded"
                />
                <span>{product.name}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDown;
