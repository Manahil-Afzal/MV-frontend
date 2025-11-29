import React, { useState } from "react";
import { IoBagHandleOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import { HiPlus, HiOutlineMinus } from "react-icons/hi";
import { Link } from "react-router-dom";
import { BsCartPlus } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { removeFromWishlist } from "../../redux/actions/wishlist";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions/cart";
import { backend_url } from "../../server";
import { toast } from "react-toastify";


const Wishlist = ({ setOpenWishlist }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const removeFromWishlistHandler = (data) => {
    dispatch(removeFromWishlist(data));
  };

  const totalPrice = wishlist.reduce((acc, item) => {
  const price = Number(String(item.discountPrice).replace(/\$/g, '')) || 0;
  return acc + price * item.qty;
}, 0);


  const addToCartHandler = (data) =>{
     const newData = {...data, qty:5};
    dispatch(addToCart(newData));
    setOpenWishlist(false);
  }
  

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 overflow-y-auto h-screen w-[25%] bg-white flex flex-col justify-between shadow-sm">
        {
          wishlist && wishlist.length === 0 ? (
            <div className="w-full h-screen flex items-center justify-center">
              <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
                <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setOpenWishlist(false)}
                />
              </div>
              <h5>Wishlist Items is empty!</h5>
            </div>
          ) : (
            <>
              <div>
                <div className="flex w-full justify-end pt-5 pr-5">
                  <RxCross1
                    size={25}
                    className="cursor-pointer"
                    onClick={() => setOpenWishlist(false)}
                  />
                </div>

                {/* items length */}
                <div className={`${styles.normalFlex} p-4`}>
                  <AiOutlineHeart size={25} />
                  <h5 className="pl-2 text-[20px] font-[500] ">{wishlist && wishlist.length} items</h5>
                </div>
                {/* cart single items */}
                <br />
                <div className="w-full border-t">
                  {wishlist &&
                    wishlist.map((i, index) => <CartSingle key={index} data={i} 
                    removeFromWishlistHandler={removeFromWishlistHandler}
                    addToCartHandler={addToCartHandler}
                    />)}
                </div>
              </div>
            </>

          )
        }
      </div>
    </div>
  );
};

const CartSingle = ({ data, removeFromWishlistHandler, addToCartHandler}) => {
  const [value, setValue] = useState(1);
  // const totalPrice = data.discountPrice * value;

  const price = Number(String(data.discountPrice).replace(/\$/g, '')) || 0;
  const totalPrice = price * value;
  
    const increment = (data) => {
      if (data.stock < value) {
        toast.error("Product stock limited!");
      } else {
        setValue(value + 1);
        const updateCartData = { ...data, qty: value + 1 };
        quantityChangeHandler(updateCartData);
      }
  
    };
  
    const decrement = (data) => {
      setValue(value === 1 ? 1 : value - 1);
      const updateCartData = {
        ...data, qty:
          value === 1 ? 1 : value - 1
      };
      removeFromCartHandler(updateCartData);
    }


  return (
    <div className=" border p-4 ">
      <div className="w-full flex items-center">
        <RxCross1 className="cursor-pointer" 
           onClick={() => removeFromWishlistHandler(data)}
        />
        <img 
        // src="data:image/jpeg;base64,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" alt=""
         src={`${backend_url}/uploads/${data?.images[0]}`}
         className="w-[80px] h-min ml-2 mr-2 rounded-[5px]" />


        <div className="pl-[5px]">
          <h1>{data.name}</h1>
          <h4 className="font-[600] text-[17px] pt-[3px] bg-[#F2A533] font-Roboto">
            US${totalPrice}
          </h4>
        </div>
        <div>
          <BsCartPlus size={20} className="cursor-pointer" tile="Add to Cart" 
             onClick={() => addToCartHandler(data)}
          />
        </div>
      </div>
    </div>
  );
};
export default Wishlist;


