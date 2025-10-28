import React, { useState, useEffect } from "react";
import { backend_url } from "../../server";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/styles";
import axios from "axios";
import { server } from "../../server";
import { useParams } from "react-router-dom";
import Loader from "../Layout/Loader";
import { getAllProductsShop } from "../../redux/actions/product";

const ShopInfo = ({ isOwner }) => {
  //  const { data } = useSelector((state) => state.data);
  // const data = dataData;
  const [data, setData] = useState(null);
  const { products } = useSelector((state) => state.products);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();  
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getAllProductsShop(id));
    setIsLoading(true);
    axios
      .get(`${server}/shop/get-shop/info/${id}`)
      .then((res) => {
        setData(res.data.shop);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [id]);



  const logoutHandler = async () => {
    axios.get(`${server}/shop/logout`, {
      withCredentials: true,
    });
    window.location.reload();
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="w-full py-5">
            <div className="w-full flex items-center justify-center">
              <img
                src={
                  data?.avatar
                    ? `${backend_url}${data?.avatar}`
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtGhh6EJ3GsKjem9tPvDkiLHQrR1z-HFFUHA&s"
                }
                alt=""
                className="w-[150px] h-[150px] object-cover rounded-full"
              />
            </div>
            <h3 className="text-center py-2 text-[20px]">{data?.name}</h3>
            <p className="text-[16px] text-[#000000a6] p-[10px] flex items-center">
              {data?.description}
            </p>
          </div>
          <div className="p-3 text-left mb-1 ">
            <h5 className="font-[600]">Address</h5>
            <h4 className="text-[#000000a6] text-left mb-1">{data?.address}</h4>
          </div>
          <div className="p-3">
            <h5 className="font-[600] text-left mb-1">Phone Number</h5>
            <h4 className="text-[#000000a6] text-left mb-1">
              {data?.PhoneNumber}
            </h4>
          </div>
          <div className="p-3">
            <h5 className="font-[600] text-left mb-1">Total Number</h5>
            <h4 className="text-[#000000a6] text-left mb-1">10</h4>
          </div>
          <div className="p-3">
            <h5 className="font-[600] text-left mb-1">Shop Ratings</h5>
            <h4 className="text-[#000000a6] text-left mb-1">4/5</h4>
          </div>
          <div className="p-3">
            <h5 className="font-[600] text-left mb-1">Joined On</h5>
            <h4 className="text-[#000000a6] text-left mb-1">
              {data?.createdAt?.slice(0, 10)}
            </h4>
          </div>
          {isOwner && (
            <div className="py-3 px-4">
              <div
                className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
              >
                <span className="text-white">Edit Shop </span>
              </div>
              <div
                className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
                onClick={logoutHandler}
              >
                <span className="text-white">Logout</span>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ShopInfo;
