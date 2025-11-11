// import React from "react";
// import styles from "../../styles/styles";
// import CountDown from "./CountDown";
// import { backend_url } from "../../server";
// import { Link } from "react-router-dom";
// import { addToCart } from "../../redux/actions/cart";
// import { useDispatch } from "react-redux";
// import { useSelector,useState } from "react-redux";
// import toast from "react-hot-toast";

// const EventCard = ({ active, data }) => {
//   const {cart} = useSelector((state) => state.cart);
//    const dispatch = useDispatch();
//    const [count, setCount] = useState(1);

//   const addToCartHandler = (data) => {
//        const isItemExists = cart && cart.find((i) => i._id === data?._id);
//       if (isItemExists) {
//         toast.error("Item already in cart!")
//       }
//       else {
//         if (data.stock < count) {
//           toast.error("Product stock limited!");
//         } else {
//           const cartData = { ...data, qty: count }
//           dispatch(addToCart(cartData));
//           toast.success("Item added to cart successfully!")
//         }
//       }
//   }

//   console.log(data);
//   return (
//     <div className={`w-full block bg-white rounded-lg ${active ? "unset" : "mb-12"} lg:flex p-4 mb-12 shadow-md`}>
//       <div className="w-full lg:-w[50%] m-auto">
//         <img
//           src="https://media.gettyimages.com/id/165853320/photo/wristwatch.jpg?s=612x612&w=0&k=20&c=DgQbRd67gNDR0rdOpywkHDTBzLB3ahw_CsMPANtWyY8="
//           alt="Rolex Watch"
//           className="rounded-lg"
//         />
//       </div>
//       <div className="w-full lg:w-[70%]  justify-center px-4">
//         <h2 className={`${styles.productTitle}`}>Rolex Submariner – Limited Edition</h2>
//         <p className="text-gray-700 text-[17px] leading-7 mt-3">
//           Discover timeless luxury with the <strong>Rolex Submariner</strong>, a perfect
//           blend of precision and elegance. Designed with a 40mm Oystersteel case,
//           scratch-resistant sapphire crystal, and automatic self-winding movement,
//           this watch ensures durability and unmatched performance.
//           Waterproof up to 300m, it’s a true icon of strength and sophistication.
//         </p>
//         <ul className="list-disc list-outside  text-gray-600 mt-3 text-[14px] space-y-2">
//           <li>40mm Oystersteel case with black Cerachrom bezel</li>
//           <li>Automatic self-winding movement (Caliber 3235)</li>
//           <li>Scratch-resistant sapphire crystal glass</li>
//           <li>300m water resistance – built for divers</li>
//           <li>Iconic Oyster bracelet with Glidelock clasp</li>
//         </ul>

//         <div className="flex py-3 justify-between items-center">
//           <div>
//             <h5 className="font-[500] text-[14px] text-[#d55b45] pr-3 line-through">
//               1099$
//             </h5>
//             <h5 className="font-bold text-[22px] text-[#333] font-Roboto">
//               999$  <span className="text-green-600 text-[15px]">(20% OFF)</span>
//             </h5>
//           </div>
//           <span className="pr-3 font-[400] text-[16px] text-[#44a55e]">
//             120 Sold
//           </span>
//         </div>
//         <div className="mt-2">
//           <CountDown />
//           <br />
//           <div className="flex items center">
//             <Link to={`/product/${data?._id}`}>
//               <div className={`${styles.button} text-[#fff]`}>
//                 See Details
//               </div>
//             </Link>
//             <Link to={`/product/${data?._id}`}>
//               <div className={`${styles.button} text-[#fff] ml-5`}
//               onClick={() => addToCartHandler(data)}
//               >
//                 Add to Cart
//               </div>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default EventCard;



import React from "react";
import styles from "../../styles/styles";
import CountDown from "./CountDown";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions/cart";
import { toast } from "react-toastify";

const EventCard = ({ active, data }) => {
  
if (!data) return null; 

  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addToCartHandler = (data) => {
    const isItemExists = cart && cart.find((i) => i._id === data._id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addToCart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  }

  return (
    <div
      className={`w-full block bg-white rounded-lg ${
        active ? "unset" : "mb-12"
      } lg:flex p-2`}
    >
      <div className="w-full lg:-w[50%] m-auto">
        <img 
        src="https://media.gettyimages.com/id/165853320/photo/wristwatch.jpg?s=612x612&w=0&k=20&c=DgQbRd67gNDR0rdOpywkHDTBzLB3ahw_CsMPANtWyY8="
        // src={`${data.images[0]?.url}`} 
        alt="" />
      </div>
      <div className="w-full lg:[w-50%] flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}>{data.name}</h2>
        <p>{data.description}</p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              {data.originalPrice}
            </h5>
            <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
              {data.discountPrice}
            </h5>
          </div>
          <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
            {data.sold_out} sold
          </span>
        </div>
        <CountDown data={data} />
        <br />
        <div className="flex items-center">
          <Link to={`/product/${data._id}?isEvent=true`}>
            <div className={`${styles.button} text-[#fff]`}>See Details</div>
          </Link>
          <div className={`${styles.button} text-[#fff] ml-5`} onClick={() => addToCartHandler(data)}>Add to cart</div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;