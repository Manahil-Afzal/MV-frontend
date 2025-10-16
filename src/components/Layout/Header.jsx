import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import { productData, categoriesData } from "../../static/data.jsx";
import {
  AiOutlineSearch,
  AiOutlineShopping,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { IoArrowForward, IoArrowDown } from "react-icons/io5";
import { BiMenuAltLeft } from "react-icons/bi";
import DropDown from "./DropDown.jsx";
import Navbar from "./Navbar";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import { backend_url } from "../../server";
import Cart from "../cart/Cart";
import Wishlist from "../wishlist/Wishlist";
import { RxCross1 } from "react-icons/rx";

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [dropDownProducts, setDropDownProducts] = useState([]);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);

  useEffect(() => {
    const handleScroll = () => setActive(window.scrollY > 70);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filtered =
      productData &&
      productData.filter((p) =>
        p.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filtered);
  };


  // handle category click
const handleCategoryClick = (category) => {
  console.log("Clicked category:", category);

  if (!category || typeof category !== "string") return;

  const filtered =
    productData &&
    productData.filter(
      (p) =>
        p.category &&
        p.category.toLowerCase().includes(category.toLowerCase())
    );

  console.log("Filtered products:", filtered);
  setDropDownProducts(filtered);
};

 

  return (
    <>
      <div className={`max-w-9xl mx-auto `}>
        <div className=" flex items-center justify-between px-4 shadow-md">
          <Link to="/">
            <img
              src="https://shopo.quomodothemes.website/assets/images/logo.svg"
              alt="Logo"
              className="h-[40px]"
            />
          </Link>

          {/* search box */}
          <div className="w-[50%] relative hidden sm:block">
            <input
              type="text"
              placeholder="Search Product..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
            />
            <AiOutlineSearch
              size={28}
              className="absolute right-2 top-2 cursor-pointer"
            />
            {searchData && searchData.length > 0 && (
              <div className="absolute bg-white shadow-md w-full z-10 p-3">
                {searchData.map((i, index) => {
                  const nameSlug = i.name.replace(/\s+/g, "-");
                  return (
                    <Link to={`/product/${nameSlug}`} key={index}>
                      <div className="flex items-center gap-2 py-2">
                        <img
                          src={i.image_Url[0].url}
                          alt={i.name}
                          className="w-[40px] h-[40px]"
                        />
                        <h1>{i.name}</h1>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <div className={`${styles.button}`}>
            <Link to="/shop-create">
              <button className="flex items-center gap-1 text-white cursor-pointer">
                Become Seller <IoArrowForward />
              </button>
            </Link>
          </div>

          {/* Mobile Menu & Cart Icons */}
          <div className="flex items-center gap-4 sm:hidden">
            <AiOutlineShoppingCart
              size={30}
              className="cursor-pointer"
              onClick={() => setOpenCart(true)}
            />
            <BiMenuAltLeft
              size={30}
              className="cursor-pointer text-gray-700"
              onClick={() => setOpenSidebar(true)}
            />
          </div>
        </div>
      </div>

      {/*  Desktop Navbar  */}
      <div
        className={`hidden md:flex items-center w-full bg-[#3321c8] h-[60px] px-11 rounded-md  relative ${
          active ? "shadow-sm top-0 left-0 z-10" : ""
        }`}
      >
        {/* Categories */}
        <div className="relative">
          <button
            onClick={() => setDropDown(!dropDown)}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg font-[500]"
          >
            <BiMenuAltLeft size={24} />
            All Categories
            <img
              src="https://cdn-icons-png.flaticon.com/128/7996/7996254.png"
              alt="Dropdown Arrow"
              className={`w-4 h-4 transition-transform duration-200 ${
                dropDown ? "rotate-180" : ""
              }`}
            />
          </button>

       {dropDown && (
  <DropDown
    categoriesData={categoriesData}
    handleCategoryClick={handleCategoryClick}   
    dropDownProducts={dropDownProducts}
  />
)}


        </div>

        {/* Navbar Center */}
        <div className="flex-1 flex justify-center">
          <Navbar active={activeHeading} />
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-4 ml-auto">
          <div
            className="relative cursor-pointer"
            onClick={() => setOpenWishlist(true)}
          >
            <AiOutlineHeart size={28} color="white" />
            <span className="absolute -top-1 -right-1 bg-[#3bc177] w-4 h-4 text-[12px] text-white flex items-center justify-center rounded-full">
              0
            </span>
          </div>

          <div
            className="relative cursor-pointer"
            onClick={() => setOpenCart(true)}
          >
            <AiOutlineShoppingCart size={28} color="white" />
            <span className="absolute -top-1 -right-1 bg-[#3bc177] w-4 h-4 text-[12px] text-white flex items-center justify-center rounded-full">
              1
            </span>
          </div>

          <Link to={isAuthenticated ? "/profile" : "/login"}>
            {isAuthenticated && user?.avatar ? (
              <img
                src={`${backend_url}${user.avatar.url}`}
                className="w-[35px] h-[35px] rounded-full border border-white"
                alt="Profile"
              />
            ) : (
              <CgProfile size={30} color="white" />
            )}
          </Link>
        </div>
      </div>

      {/* ------------ Sidebar for Mobile ------------- */}
      {openSidebar && (
        <div className="800:hidden fixed top-0 left-0 w-full h-screen bg-[#0000005e] z-20">
          <div className="w-[50%] bg-white h-full shadow-md p-5 relative overflow-y-scroll">
            {/* Close */}
            <RxCross1
              size={25}
              className="absolute top-4 right-4 cursor-pointer text-gray-700"
              onClick={() => setOpenSidebar(false)}
            />

            {/* Search */}
            <div className="w-full mt-10 mb-4 relative">
              <input
                type="text"
                placeholder="Search Product..."
                className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <AiOutlineSearch
                size={25}
                className="absolute right-2 top-2 cursor-pointer text-gray-600"
              />
            </div>

            {/* Navbar */}
            <Navbar active={activeHeading} />

            {/* Wishlist & Seller */}
            <div className="flex items-center justify-between mt-6">
              <div
                className="absolute top-4 right-14 cursor-pointer"
                onClick={() => setOpenWishlist(true)}
              >
                <AiOutlineHeart size={25} className="text-gray-700" />
                <span className="absolute -top-1 -right-2 bg-[#3bc177] w-4 h-4 text-[10px] text-white flex items-center justify-center rounded-full">
                  0
                </span>
              </div>

              <Link to="/shop-create">
                <button className="bg-[#3bc177] text-white px-4 py-2 rounded-md flex items-center gap-2">
                  Become Seller <IoArrowForward />
                </button>
              </Link>
            </div>

            {/* Profile */}
            <div className="flex flex-col items-center mt-8">
              <Link
                to={isAuthenticated ? "/profile" : "/login"}
                className="flex flex-col items-center"
              >
                {isAuthenticated && user?.avatar ? (
                  <img
                    src={`${backend_url}${user.avatar.url}`}
                    className="w-[60px] h-[60px] rounded-full border-[3px] border-[#3bc177]"
                    alt="Profile"
                  />
                ) : (
                  <CgProfile size={40} />
                )}
                <span className="text-gray-700 text-sm mt-2">
                  {isAuthenticated ? "Go to Profile" : "Login / Sign Up"}
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ------------ Popups ------------- */}
      {openCart && <Cart setOpenCart={setOpenCart} />}
      {openWishlist && <Wishlist setOpenWishlist={setOpenWishlist} />}
    </>
  );
};

export default Header;
