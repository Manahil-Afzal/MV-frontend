import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import styles from "../../../styles/styles";
import {
  AiOutlineMessage,
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";

const ProductDetailsCard = ({ setOpen, data }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  // const [select, setSelect] = useState(false);

  const handleMessageSubmit = () => {};

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  return (
    <div className="bg-[#fff]">
      {data ? (
        <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items items-center justify-center">
          <div className="w-[90%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4">
            <RxCross2
              size={30}
              className="absolute right-3 top-3 z-50"
              onClick={() => setOpen(false)}
            />
            <div className="block w-full 800px:flex">
              <div className="w-1/2 h-full flex flex-col">
                <img
                  src={data.image_Url[0].url}
                  alt=""
                  className="w-full h-[70%] object-cover rounded-md"
                />
                <div className="flex items-center mt-4 px-2">
                  <img
                    src={data.shop.shop_avatar.url}
                    alt=""
                    className="w-10 h-10 rounded-full mr-2"
                  />
                  <div>
                    <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                    <p className="text-sm text-gray-500">
                      {data.shop.ratings} Ratings{" "}
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-1/2 h-full flex flex-col justify-center items-start px-4">
                <div
                  className={`${styles.button} bg-[#000]  rounded-[4px] h-12 flex items-center justify-center cursor-pointer`}
                  onClick={handleMessageSubmit}
                >
                  <span className="text-[#fff] flex items-center ">
                    Send Message{" "}
                    <AiOutlineMessage className="ml-2  flex flex-row " />
                  </span>
                </div>
                <h5 className="text-[16px] text-[red] mt-3 flex flex-row">
                  ({data.total_sell}) Sold out
                </h5>
              </div>
            </div>

            <div className="w-full 800px:w-[50%] -mt-100 pt-50 pl-[290px] pr-[50px]">
              <h1 className={`${styles.productTitle}  text-[20px] `}>
                {data.name}
              </h1>
              <p> {data.description}</p>
              <div className="flex pt-3">
                <h4 className={`${styles.productDiscountPrice}`}>
                  {data.discount_price}$
                </h4>
                <h3 className={`${styles.price}`}>
                  {data.price ? data.price + "$" : null}
                </h3>
              </div>
              <div className="flex items-center mt-12 justify-between pr-3">
                <div>
                  <button
                    className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover-opacity-75 transition duration-300 ease-in-out "
                    onClick={decrementCount}
                  >
                    -
                  </button>
                  <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                    {count}
                  </span>
                  <button
                    className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover-opacity-75 transition duration-300 ease-in-out "
                    onClick={incrementCount}
                  >
                    +
                  </button>
                </div>
                <div>
                  {click ? (
                    <AiFillHeart
                      size={30}
                      className="cursor-pointer "
                      onClick={() => setClick(!click)}
                      color={click ? "red" : "#333"}
                      title="Remove From wishlist"
                    />
                  ) : (
                    <AiOutlineHeart
                      size={30}
                      className="cursor-pointer"
                      onClick={() => setClick(!click)}
                      color={click ? "red" : "#333"}
                      title="Add to wishlist"
                    />
                  )}
                </div>
              </div>
              <div className={`${styles.button} mt-6 rounded-[4px] h-11 flex items-center`}>
                <span className="text-[#fff] flex items-center">
                  Add to Cart
                  <AiOutlineShoppingCart className="ml-1" />
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetailsCard;
