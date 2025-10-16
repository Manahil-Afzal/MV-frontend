import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineMessage,
} from "react-icons/ai";

const ProductDetails = ({ data }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleMessageSubmit = () => {
    navigate("/inbox?conversation=507ebjver884ehfdjeriv84");
  };

  return (
    <div className="bg-white ">
      {data ? (
        <div className={`${styles.section} w-[90%]  800:w-[80%] `}>
          <div className="w-full py-5 ">
            <div className="block w-full 800:flex">
              <div className="w-[50%] 800:w-[50%]">
                <img
                  src={data.image_Url[select].url}
                  alt=""
                  className="w-[80%]"
                />
                <div className="flex items-center gap-2 mt-4">
                  <div
                    className={`${
                      select === 0 ? "border" : "null"
                    } cursor-pointer `}
                  >
                    <img
                      src={data?.image_Url[0].url}
                      alt=""
                      className="h-[150px]"
                      onClick={() => setSelect(0)}
                    />
                  </div>
                  <div
                    className={`${
                      select === 1 ? "border" : "null"
                    } cursor-pointer`}
                  >
                    <img
                      src={data?.image_Url[1].url}
                      alt=""
                      className="h-[150px]"
                      onClick={() => setSelect(1)}
                    />
                  </div>
                </div>
              </div>
                  <div className="w-full 800:w-[50%] pt-5">
                  <h1 className={`${styles.productTitle}`}>{data.name}</h1>
                  <p>{data.description}</p>
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

                  <div
                    className={`${styles.button}, !mt-6 !rounded !h-11 flex items-center`}
                  >
                    <span className="text-white flex items-center">
                      Add to Cart <AiOutlineShoppingCart className="ml-1" />
                    </span>
                  </div>
                  <div className=" flex items-center pt-8">
                    <img
                      src={data.shop.shop_avatar.url}
                      alt=""
                      className="w-[50px] h-[50px] rounded-full mr-2"
                    />
                    <div className="pr-8">
                      <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                        {data.shop.name}
                      </h3>
                      <h5 className="pb-3 text-[15px] ">
                        ({data.shop.ratings}) Ratings
                      </h5>
                    </div>
                    <div
                      className={`${styles.button} !bg-[#6443d1] mt-4 !rounded !h-11`}
                      onClick={handleMessageSubmit}
                    >
                      <span className="text-white flex items-center">
                        Send Message <AiOutlineMessage className="ml-1" />
                      </span>
                    </div>
                  </div>
                </div>
            </div>
          </div>
          <ProductDetailsInfo data={data} />
        </div>
      ) : null}
    </div>
  );
};

const ProductDetailsInfo = ({ data }) => {
  const [active, setActive] = useState(1);
  return (
    <div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded ">
      <div className="w-full flex justify-between border-b pt-10 pb-2">
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 loading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>
          {active === 1 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>

        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 loading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(2)}
          >
            Product Reviews
          </h5>
          {active === 2 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 loading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(3)}
          >
            Seller Information
          </h5>
          {active === 3 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
      </div>
      {active === 1 ? (
        <>
          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
            This product is made with premium quality materials, designed to
            provide durability, performance, and comfort. Each item is carefully
            crafted to meet customer expectations and deliver the best value for
            your money.
          </p>

          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
            Whether you are using it for personal, professional, or daily
            lifestyle needs, this product ensures reliability and ease of use.
            It goes through multiple quality checks before being delivered to
            our customers.
          </p>

          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
            Please review the specifications, pricing, and available variants to
            find the perfect fit for your requirements. For any further details,
            you can contact the seller directly through our platform.
          </p>
        </>
      ) : null}

      {active === 2 ? (
        <div className="w-full justify-center min-h-[40vh] flex items-center">
          <p> No Reviews yet</p>
        </div>
      ) : null}

      {active === 3 && (
        <div className="w-full block 800:flex p-5">
          <div className="w-full 800:w-[50%]">
            <div className="flex items-center">
              <img
                src={data.shop.shop_avatar.url}
                className="w-[50px] h-[50px] rounded-full"
                alt=""
              />
              <div className="pl-3">
                <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                <h5 className="pb-2 text-[15px]">
                  {data.shop.ratings} Ratings{" "}
                </h5>
              </div>
            </div>
            <p className="pt-2">
              "This seller is reliable and committed to providing high-quality
              products and excellent customer service. All items are carefully
              checked to ensure customer satisfaction."
            </p>
          </div>
          <div className="w-full 800:w-[50%] mt-5 800:mt-0 800:flex flex-col items-end">
            <div className="text-left">
              <h5 className="font-[600]">
                Joined on : <span className="font-[500]">14 March, 2024</span>
              </h5>
              <h5 className="font-[600]">
                Total Products : <span className="font-[500]">1,332</span>
              </h5>
              <h5 className="font-[600]">
                Total Reviews : <span className="font-[500]">324</span>
              </h5>
              <Link to="/">
                <div
                  className={`${styles.button} !rounded-[4px] !h-[39.5px] mt-3`}
                >
                  <h4 className="text-white "> Visit Shop</h4>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProductDetails;

















// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import styles from "../../styles/styles";
// import {
//   AiFillHeart,
//   AiOutlineHeart,
//   AiOutlineShoppingCart,
//   AiOutlineMessage,
// } from "react-icons/ai";

// const ProductDetails = ({ data }) => {
//   const [count, setCount] = useState(1);
//   const [click, setClick] = useState(false);
//   const [select, setSelect] = useState(0);
//   const navigate = useNavigate();

//   const incrementCount = () => setCount(count + 1);
//   const decrementCount = () => count > 1 && setCount(count - 1);

//   const handleMessageSubmit = () => {
//     navigate("/inbox?conversation=507ebjver884ehfdjeriv84");
//   };

//   return (
//     <div className="bg-white">
//       {data && (
//         <div className={`${styles.section} w-[60%] 800px:w-[60%] mx-auto`}>
//           <div className="w-full py-5">
//             <div className="block w-full 800px:flex justify-center">
//               {/* Images Section */}
//               <div className="w-full 800px:w-[50%] text-center">
//                 <img
//                   src={data.image_Url[select].url}
//                   alt=""
//                   className="w-[80%] block mx-auto"
//                 />
//                 <div className="flex items-center gap-2 mt-4 justify-center">
//                   {data.image_Url.map((img, index) => (
//                     <div
//                       key={index}
//                       className={`${select === index ? "border" : ""} cursor-pointer`}
//                       onClick={() => setSelect(index)}
//                     >
//                       <img src={img.url} alt="" className="h-[150px] block mx-auto" />
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Text Section */}
//               <div className="w-full 800px:w-[50%] pt-5 text-center 800px:text-left">
//                 <h1 className={`${styles.productTitle} w-full max-w-[600px] mx-auto 800px:mx-0`}>
//                   {data.name}
//                 </h1>
//                 <p className="w-full max-w-[600px] mx-auto 800px:mx-0">{data.description}</p>
//                 <div className="flex flex-col items-center 800px:items-start pt-3">
//                   <h4 className={`${styles.productDiscountPrice}`}>{data.discount_price}$</h4>
//                   <h3 className={`${styles.price}`}>{data.price ? data.price + "$" : null}</h3>
//                 </div>

//                 <div className="flex items-center mt-12 justify-center 800px:justify-between pr-3">
//                   <div>
//                     <button
//                       className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover-opacity-75 transition duration-300 ease-in-out"
//                       onClick={decrementCount}
//                     >
//                       -
//                     </button>
//                     <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
//                       {count}
//                     </span>
//                     <button
//                       className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover-opacity-75 transition duration-300 ease-in-out"
//                       onClick={incrementCount}
//                     >
//                       +
//                     </button>
//                   </div>
//                   <div>
//                     {click ? (
//                       <AiFillHeart
//                         size={30}
//                         className="cursor-pointer"
//                         onClick={() => setClick(!click)}
//                         color="red"
//                         title="Remove From wishlist"
//                       />
//                     ) : (
//                       <AiOutlineHeart
//                         size={30}
//                         className="cursor-pointer"
//                         onClick={() => setClick(!click)}
//                         color="#333"
//                         title="Add to wishlist"
//                       />
//                     )}
//                   </div>
//                 </div>

//                 <div className={`${styles.button} !mt-6 !rounded !h-11 flex items-center justify-center`}>
//                   <span className="text-white flex items-center">
//                     Add to Cart <AiOutlineShoppingCart className="ml-1" />
//                   </span>
//                 </div>

//                 <div className="flex flex-col items-center 800px:flex-row 800px:items-center pt-8 gap-4">
//                   <img
//                     src={data.shop.shop_avatar.url}
//                     alt=""
//                     className="w-[50px] h-[50px] rounded-full"
//                   />
//                   <div>
//                     <h3 className={`${styles.shop_name} pb-1 pt-1`}>
//                       {data.shop.name}
//                     </h3>
//                     <h5 className="pb-3 text-[15px]">{data.shop.ratings} Ratings</h5>
//                   </div>
//                   <div
//                     className={`${styles.button} !bg-[#6443d1] !rounded !h-11`}
//                     onClick={handleMessageSubmit}
//                   >
//                     <span className="text-white flex items-center">
//                       Send Message <AiOutlineMessage className="ml-1" />
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <ProductDetailsInfo data={data} />
//         </div>
//       )}
//     </div>
//   );
// };

// const ProductDetailsInfo = ({ data }) => {
//   const [active, setActive] = useState(1);

//   return (
//     <div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded">
//       <div className="w-full flex justify-between border-b pt-10 pb-2">
//         {["Product Details", "Product Reviews", "Seller Information"].map((title, index) => (
//           <div key={index} className="relative">
//             <h5
//               className="text-[#000] text-[18px] px-1 font-[600] cursor-pointer 800px:text-[20px]"
//               onClick={() => setActive(index + 1)}
//             >
//               {title}
//             </h5>
//             {active === index + 1 && <div className={styles.active_indicator} />}
//           </div>
//         ))}
//       </div>

//       {active === 1 && (
//         <>
//           <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
//             This product is made with premium quality materials, designed to
//             provide durability, performance, and comfort. Each item is carefully
//             crafted to meet customer expectations and deliver the best value for
//             your money.
//           </p>

//           <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
//             Whether you are using it for personal, professional, or daily
//             lifestyle needs, this product ensures reliability and ease of use.
//             It goes through multiple quality checks before being delivered to
//             our customers.
//           </p>

//           <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
//             Please review the specifications, pricing, and available variants to
//             find the perfect fit for your requirements. For any further details,
//             you can contact the seller directly through our platform.
//           </p>
//         </>
//       )}

//       {active === 2 && (
//         <div className="w-full justify-center min-h-[40vh] flex items-center">
//           <p>No Reviews yet</p>
//         </div>
//       )}

//       {active === 3 && (
//         <div className="w-full block 800px:flex p-5">
//           <div className="w-full 800px:w-[50%]">
//             <div className="flex items-center">
//               <img
//                 src={data.shop.shop_avatar.url}
//                 className="w-[50px] h-[50px] rounded-full"
//                 alt=""
//               />
//               <div className="pl-3">
//                 <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
//                 <h5 className="pb-2 text-[15px]">{data.shop.ratings} Ratings</h5>
//               </div>
//             </div>
//             <p className="pt-2">
//               This seller is reliable and committed to providing high-quality
//               products and excellent customer service. All items are carefully
//               checked to ensure customer satisfaction.
//             </p>
//           </div>
//           <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 flex flex-col items-start">
//             <h5 className="font-[600]">
//               Joined on: <span className="font-[500]">14 March, 2024</span>
//             </h5>
//             <h5 className="font-[600]">
//               Total Products: <span className="font-[500]">1,332</span>
//             </h5>
//             <h5 className="font-[600]">
//               Total Reviews: <span className="font-[500]">324</span>
//             </h5>
//             <Link to="/">
//               <div className={`${styles.button} !rounded-[4px] !h-[39.5px] mt-3`}>
//                 <h4 className="text-white">Visit Shop</h4>
//               </div>
//             </Link>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductDetails;
