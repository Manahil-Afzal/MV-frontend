import React from "react";
import { AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { FiMessageSquare, FiPackage, FiShoppingBag } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";
import { backend_url } from "../../../server.js";

const DashboardHeader = () => {
  const { seller } = useSelector((state) => state.seller);
  return (
    <div className="w-full h-[80px]  bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4 ">
      <div>
        <Link to="/dashboard">
          <img
            src="https://shopo.quomodothemes.website/assets/images/logo.svg"
            alt=""
          />
        </Link>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <Link to="/dashboard/cupouns" className="md:block hidden">
            <AiOutlineGift
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard-events" className="md:block hidden">
            <MdOutlineLocalOffer
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard-products" className="md:block hidden">
            <FiShoppingBag
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>

          <Link to="/dashboard-orders" className="md:block hidden">
            <FiPackage color="#555" size={30} className="mx-5 cursor-pointer" />
          </Link>

          <Link to="/dashboard-messages" className="md:block hidden">
            <BiMessageSquareDetail
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          {/* <Link to={`/shop/${seller._id}`}>
            <img
            src={`${backend_url}${seller.avatar}`}
            // src="data:image/jpeg;base64,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"
              alt=""
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
          </Link> */}
          <Link to={`/shop/${seller?._id || ""}`}>
            <img
              src={
                seller?.avatar
                  ? `${backend_url}/uploads/${seller.avatar}`
               : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtGhh6EJ3GsKjem9tPvDkiLHQrR1z-HFFUHA&s"
                }
              alt=""
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
