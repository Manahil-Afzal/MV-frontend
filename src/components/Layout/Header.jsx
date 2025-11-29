
// File: src/components/layout/Header.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import { categoriesData } from "../../static/data.jsx";
import {
  AiOutlineSearch,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoArrowForward } from "react-icons/io5";
import { BiMenuAltLeft } from "react-icons/bi";
import DropDown from "./DropDown.jsx";
import Navbar from "./Navbar";
import { CgProfile } from "react-icons/cg";
import { useSelector, useDispatch } from "react-redux";
import { backend_url } from "../../server";
import { getAllProductsShop } from "../../redux/actions/product";
import Cart from "../cart/Cart";
import Wishlist from "../wishlist/Wishlist";
import { RxCross1 } from "react-icons/rx";


const Header = ({ activeHeading , onSearchActive  }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isSeller } = useSelector((state) => state.seller);
  const { wishlist } = useSelector((state) => state.wishlist)
  const { cart } = useSelector((state) => state.cart);
  const { allProducts } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [dropDownProducts, setDropDownProducts] = useState([]);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  



  const shopId = user?._id;

  useEffect(() => {
    if (!user) return;
    const shopId = user.shopId || user._id;
    if (shopId) dispatch(getAllProductsShop(shopId));
  }, [dispatch, user]);

 useEffect(() => {
    if (onSearchActive) {
      onSearchActive(searchData.length > 0); // true if search results exist
    }
  }, [searchData, onSearchActive]);


  useEffect(() => {
  }, [allProducts, categoriesData]);

  // Header scroll effect
  useEffect(() => {
    const handleScroll = () => setActive(window.scrollY > 70);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Search input
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (!allProducts || allProducts.length === 0) {
      setSearchData([]);
      return;
    }

    const filteredProducts = allProducts.filter((product) =>
      product.name?.toLowerCase().includes(term.toLowerCase())
    );
    setSearchData(filteredProducts); // this triggers useEffect above
  };


  // Filter by category
  const handleCategoryClick = (category) => {
    const filteredProducts =
      allProducts?.filter((product) => {
        return (
          product.category &&
          product.category.toLowerCase() === category.toLowerCase()
        );
      }) || [];
    setDropDownProducts(filteredProducts);
  };




  return (
    <>
      {/* Top Header */}
      <div className="max-w-9xl mx-auto">
        <div className="h-[70px] flex items-center justify-between px-4 shadow-md">
          <Link to="/" className="ml-20">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfOTbSSEiEXBDYndLMpKOO0EQFZGYDChWE0w&s"
              alt="Logo"
              className="h-[110px] object-contain"
            />
          </Link>


          <div className="relative w-full max-w-sm">
            <input
              type="text"
              placeholder="Search Product......"
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[35px] w-full px-4 pr-20 bg-white border-2 border-[#417fa0] rounded-md text-[#123243] placeholder-[#417fa0] focus:outline-none"
            />
            <button
              className="absolute right-0 top-0  h-[35px] px-5 bg-[#417fa0] text-white rounded-md font-medium hover:bg-[#2f6280] transition-colors"
            >
              Search
            </button>


             {searchData.length > 0 && (
    <div className="absolute bg-white shadow-md w-full z-10 p-3 max-h-60 overflow-y-scroll">
      {searchData.map((i, index) => (
        <Link
          to={`/product/${i.slug}`}
          key={index}
          onClick={() => setSearchData([])} 
        >
          <div className="flex items-center gap-2 py-2 hover:bg-gray-100 rounded-md cursor-pointer">
            <img
              src={`${backend_url}/uploads/${i.images[0]}`}
              alt={i.name}
              className="w-[40px] h-[40px] mr-[10px]"
            />
            <h1>{i.name}</h1>
          </div>
        </Link>
      ))}
    </div>
  )}
{/* {searchData && searchData.length > 0 && (
  <div className="fixed top-[70px] left-0 w-full h-screen bg-white z-50 p-6 overflow-y-scroll">
    <h2 className="text-2xl font-bold mb-4">Search Results ({searchData.length})</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {searchData.map((i) => (
        <Link to={`/product/${i.slug}`} key={i._id} onClick={() => setSearchData([])}>
          <div className="border p-3 rounded-md hover:shadow-md cursor-pointer">
            <img
              src={`${backend_url}/uploads/${i.images[0]}`}
              alt={i.name}
              className="w-full h-40 object-cover mb-2"
            />
            <h1 className="text-lg font-medium">{i.name}</h1>
            <p className="text-[#417fa0] font-semibold">{i.price ? `$${i.price}` : ''}</p>
          </div>
        </Link>
      ))}
    </div>
    <button
      className="absolute top-4 right-4 text-xl font-bold"
      onClick={() => setSearchData([])}
    >
      ×
    </button>
  </div>
)} */}

          </div>

          <div className={`${styles.button}`}>
            <Link to={`${isSeller ? '/dashboard': 'shop-create'}`}>
              <button className="flex items-center gap-1 bg-[#F2A533] text-white cursor-pointer px-3 py-1 rounded-md">
                {isSeller ? " Dashboard" : "Become Seller"} <IoArrowForward />
              </button>
            </Link>
          </div>

          {/* Mobile icons */}
          <div className="flex items-center gap-4 sm:hidden">
            <AiOutlineShoppingCart
              size={30}
              className="cursor-pointer"
              onClick={() => setOpenCart(true)}
            />
            <BiMenuAltLeft
              size={30}
              className="cursor-pointer text-[#417fa0]"
              onClick={() => setOpenSidebar(true)}
            />
          </div>
        </div>
      </div>

      {/* Desktop Navbar */}
      <div
        className={`hidden md:flex items-center w-full bg-[#417fa0] h-[60px] px-11  relative ${active ? "shadow-sm top-0 left-0 z-10" : ""
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
              className={`w-4 h-4 transition-transform duration-200 ${dropDown ? "rotate-180" : ""
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
            <span className="absolute -top-1 -right-1 bg-[#F2A533] w-4 h-4 text-[12px] text-white flex items-center justify-center rounded-full">
              {wishlist && wishlist.length}
            </span>
          </div>

          <div
            className="relative cursor-pointer"
            onClick={() => setOpenCart(true)}
          >
            <AiOutlineShoppingCart size={28} color="white" />
            <span className="absolute -top-1 -right-1 bg-[#F2A533] w-4 h-4 text-[12px] text-white flex items-center justify-center rounded-full">
              {cart && cart.length}
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

      {/* Mobile Sidebar */}
      {openSidebar && (
        <div className="800:hidden fixed top-0 left-0 w-full h-screen bg-[#0000005e] z-20">
          <div className="w-[50%] bg-white h-full shadow-md p-5 relative overflow-y-scroll">
            <RxCross1
              size={25}
              className="absolute top-4 right-4 cursor-pointer text-[#417fa0]"
              onClick={() => setOpenSidebar(false)}
            />
            <div className="mb-11 mt-20 ">
         <h2 className="text-xl font-bold ">Menu</h2>
            <Navbar active={activeHeading} />
            </div>
    

            <div className="flex items-center justify-between mt-6">
              <div
                className="absolute top-4 right-14 cursor-pointer"
                onClick={() => setOpenWishlist(true)}
              >
                <AiOutlineHeart size={25} className="text-[#417fa0]" />
                <span className="absolute -top-1 -right-2 bg-[#417fa0] w-4 h-4 text-[10px] text-white flex items-center justify-center rounded-full">
                  {cart && cart.length}
                </span>
              </div>

              <Link to="/shop-create">
                <button className="bg-[#417fa0] text-white px-4 py-2  ml-13 rounded-md flex items-center gap-2">
                  Become Seller <IoArrowForward />
                </button>
              </Link>
            </div>

            <div className="flex flex-col items-center mt-8">
              <Link
                to={isAuthenticated ? "/profile" : "/login"}
                className="flex flex-col items-center"
              >
                {isAuthenticated && user?.avatar ? (
                  <img
                    src={`${backend_url}${user.avatar.url}`}
                    className="w-[60px] h-[60px] rounded-full border-[3px] border-[#417fa0]"
                    alt="Profile"
                  />
                ) : (
                  <CgProfile size={40} />
                )}
                <span className="text-[#417fa0] text-sm mt-2">
                  {isAuthenticated ? "Go to Profile" : "Login / Sign Up"}
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Popups */}
      {openCart && <Cart setOpenCart={setOpenCart} />}
      {openWishlist && <Wishlist setOpenWishlist={setOpenWishlist} />}
    </>
  );
};

export default Header;



