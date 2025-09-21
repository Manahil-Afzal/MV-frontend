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

const Header = ({ activeHeading }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts =
      productData &&
      productData.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );

    setSearchData(filteredProducts);
  };

  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 70);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className={`${styles.section}`}>
        <div className="h-[50px] flex items-center justify-between px-4 shadow-md">
          <div>
            <Link to="/">
              <img
                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt="Logo"
                className="h-[40px]"
              />
            </Link>
          </div>

          {/* search box */}
          <div className="w-[50%] relative">
            <input
              type="text"
              placeholder="Search Product..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5  cursor-pointer"
            />
            {searchData && searchData.length !== 0 ? (
              <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4 cursor-pointer">
                {searchData &&
                  searchData.map((i, index) => {
                    const d = i.name;
                    const Product_name = d.replace(/\s+/g, "-");
                    return (
                      <Link to={`/product/${Product_name}`} key={index}>
                        <div className="w-full flex items-start py-3">
                          <img
                            src={i.image_Url[0].url}
                            alt={i.name}
                            className="w-[40px] h-[40px] mr-[10px]"
                          />
                          <h1>{i.name}</h1>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            ) : null}
          </div>

          <div className={`${styles.button}`}>
            <Link to="/seller">
              <button className="flex items-center gap-1 text-white cursor-pointer">
                Become Seller <IoArrowForward />
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div
        className={`${active ? "shadow-sm fixed top-0 left-0 z-10" : ""} 
        transition hidden md:flex items-center bg-[#3321c8] h-[50px] px-6 rounded-md mt-1.5`}
      >
        <button
          className="flex items-center gap-2 px-4 py-2 bg-white font-sans text-lg font-[500] rounded-lg relative cursor-pointer"
          onClick={() => setDropDown(!dropDown)}
        >
          <BiMenuAltLeft size={27} className="text-gray-700" />
          All Categories
          <img
            src="https://cdn-icons-png.flaticon.com/128/7996/7996254.png"
            alt="Dropdown Arrow"
            className={`w-4 h-4 ml-2 transition-transform duration-200 cursor-pointer ${
              dropDown ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        {dropDown && (
          <DropDown categoriesData={categoriesData} setDropDown={setDropDown} />
        )}
        <div className="flex-1 flex justify-center items-center ">
          <Navbar active={activeHeading} />
        </div>

        <div className="flex">
          <div className={`${styles.normalFlex}`}>
            <div className="relative cursor-pointer mr-[15px]">
              <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
              <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                0
              </span>
            </div>
          </div>

          <div className={`${styles.normalFlex}`}>
            <div className="relative cursor-pointer mr-[15px]">
              <AiOutlineShoppingCart size={30} color="rgb(255 255 255 / 83%)" />
              <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                1
              </span>
            </div>
          </div>

          <div className={`${styles.normalFlex}`}>
            <div className="relative cursor-pointer mr-[15px]">
              <Link to="/login">
                <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
