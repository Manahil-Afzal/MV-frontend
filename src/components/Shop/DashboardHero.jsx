import React, { useEffect, useState } from "react";
import { AiOutlineArrowRight, AiOutlineMoneyCollect } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { MdBorderClear } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { getAllProductsShop } from "../../redux/actions/product";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";


const DashboardHero = () => {
  const dispatch = useDispatch();
  const { allOrders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const { allProducts } = useSelector((state) => state.products);
  const [deliveredOrder, setDeliveredOrder] = useState(null);
  

// 1. Fetch orders and products
useEffect(() => {
  if (seller && seller._id) {
    dispatch(getAllOrdersOfShop(seller._id));
    dispatch(getAllProductsShop(seller._id));
  }
}, [dispatch, seller]);

// 2. Update delivered orders when allOrders changes
useEffect(() => {
  if (allOrders && allOrders.length > 0) {
    const orderData = allOrders.filter(
      (item) => item.status.toLowerCase() === "delivered" // safe case-insensitive match
    );
    setDeliveredOrder(orderData);
  }
}, [allOrders]);

 


const totalEarningWithoutTax = deliveredOrder
  ? deliveredOrder.reduce((acc, item) => acc + Number(item.totalPrice), 0)
  : 0;

const serviceCharge = totalEarningWithoutTax * 0.1;
const availableBalance = totalEarningWithoutTax - serviceCharge;



useEffect(() => {
  console.log("Seller:", seller);
  console.log("All Orders:", allOrders);
  console.log("Delivered Orders:", deliveredOrder);
  console.log("Available Balance:", availableBalance);
}, [seller, allOrders, deliveredOrder, availableBalance]);


 

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.value === "Delivered" ? "greenColor" : "redColor";
      },

    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
               {/* <Link to={`/dashboard/order/${params.id}`}> */}
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  allOrders && allOrders.forEach((item) => {
    row.push({
      id: item._id,
      itemsQty: item.cart.reduce((acc, item) => acc + item.qty, 0),
      total: "US$ " + item.totalPrice,
      status: item.status,
    });
  });


  return (
    <div className="w-full p-8">
      <h3 className="text-[22px] font-Poppins pb-2">Overview</h3>
      <div className="w-full block 800:flex items-center justify-between">
        <div className="w-full mb-4 800:w-[30%] min-h-[30vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <AiOutlineMoneyCollect
              size={30}
              className="mr-2"
              fill="#00000085"
            />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              Account Balance{" "}
              <span className="text-[16px]">(with 10% service charge)</span>
            </h3>
          </div>
          <h5 className="pt-2 pl-[30px] text-[22px] font-[500]">${availableBalance}</h5>
          <Link to="/dashboard-withdraw-money">
            <h5 className="pt-4  text-[#077f9c] inline-flex">Withdraw Money</h5>
          </Link>
        </div>

        <div className="w-full mb-4 800:w-[30%] min-h-[30vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <MdBorderClear size={30} className="mr-2" fill="#00000085" />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              All Orders
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">{allOrders && allOrders.length}</h5>
          <Link to="/dashboard-orders">

            {/* <span className="text-[20px]"> <b> 10</b></span> */}
            <h5 className="pt-6  text-[#077f9c] cursor-pointer">View Orders</h5>
          </Link>
        </div>

        <div className="w-full mb-4 800:w-[30%] min-h-[30vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <AiOutlineMoneyCollect
              size={30}
              className="mr-2"
              fill="#00000085"
            />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              All Products
            </h3>
          </div>
          <h5 className="pt-2 pl-[30px] text-[22px] font-[500]">{allProducts && allProducts.length}</h5>
          <Link to="/dashboard-products">
            {/* <span className="text-[20px]"> <b> 12</b></span> */}
            <h5 className="pt-6 text-[#077f9c] cursor-pointer">View Products</h5>
          </Link>
        </div>
      </div>
      <br />
      <h3 className="text-[22px] font-Poppins pb-2">Latest Orders</h3>
      <div className="w-full min-h-[45vh] bg-white rounded">
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
        />
      </div>
    </div>
  );
};

export default DashboardHero;