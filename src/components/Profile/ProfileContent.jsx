import React, { useState } from "react";
import { backend_url } from "../../server";
import { useSelector } from "react-redux";
import styles from '../../styles/styles';
import { Link, useNavigate } from "react-router-dom";
import ProfileSidebar from "./ProfileSidebar";
import { AiOutlineArrowRight, AiOutlineCamera, AiOutlineDelete } from "react-icons/ai";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { MdOutlineTrackChanges } from "react-icons/md";

const ProfileContent = ({ active }) => {
  const { user } = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [Update, setUpdate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="w-full ">
      {/* profile page */}
      {active === 1 && (
        <>
          <div className="flex justify-center w-full ">
            <div className="relative">
              <img
                //   src={`${backend_url}${user?.avatar?.url}`}
                src={`${backend_url}/${user?.avatar}`}
                className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
                alt=""
              />
              <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-ful  flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                <AiOutlineCamera />
              </div>
            </div>
          </div>
          <br />
          <br />

          <div className="w-full px-5 mr-3 gap-x-4">
            <form
              onSubmit={handleSubmit}
              aria-required={true}
              className="space-y-6"
            >
              <div className="w-full flex pb-3  gap-x-4">
                <div className="w-[50%] flex flex-col">
                  <label className="mb-1 text-gray-800 font-medium">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-1 border border-gray-600 rounded-md outline-none"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="w-[50%] flex flex-col  gap-x-4">
                  <label className="mb-1 text-gray-800 font-medium">
                    Email Address
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-1 border border-gray-600 rounded-md outline-none"
                    required
                    value={email}
                    onChange={() => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full flex pb-3  gap-x-4">
                <div className="w-[50%] flex flex-col">
                  <label className="mb-1 text-gray-800 font-medium">
                    Phone Numbers
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-1 border border-gray-600 rounded-md outline-none"
                    required
                    value={phoneNumber}
                    onChange={() => setPhoneNumber(e.target.value)}
                  />
                </div>

                <div className="w-[50%] flex flex-col  gap-x-4">
                  <label className="mb-1 text-gray-800 font-medium">
                    Zip Code
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-1 border border-gray-600 rounded-md outline-none"
                    required
                    value={zipCode}
                    onChange={() => setZipCode(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full flex pb-3  gap-x-4">
                <div className="w-[50%] flex flex-col">
                  <label className="mb-1 text-gray-800 font-medium">
                    Address 1
                  </label>
                  <input
                    type="address1"
                    className="w-full px-3 py-1 border border-gray-600 rounded-md outline-none"
                    required
                    value={address1}
                    onChange={() => setAddress1(e.target.value)}
                  />
                </div>

                <div className="w-[50%] flex flex-col  gap-x-4">
                  <label className="mb-1 text-gray-800 font-medium">
                    Address 2
                  </label>
                  <input
                    type="address1"
                    className="w-full px-3 py-1 border border-gray-600 rounded-md outline-none"
                    required
                    value={address2}
                    onChange={() => setAddress2(e.target.value)}
                  />
                </div>
              </div>
              <input
                className={`w-[250px] h=[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
                required
                value="Update"
                type="submit"
              />
            </form>
          </div>
        </>
      )}

      {/* order page */}
      {active === 2 && (
        <div>
          <AllOrders />
        </div>
      )}

      {/* Refund page */}
      {active === 3 && (
        <div>
          <AllRefundOrders />
        </div>
      )}

      {/* Track order  */}
      {active === 5 && (
        <div>
          <TrackOrder />
        </div>
      )}

     {/* payment method  */}
      {active === 6 && (
        <div>
          <PaymentMethod />
        </div>
      )}

      {/* user Address */}
      {active === 7 && (
        <div>
          <Address />
        </div>
      )}
    </div>
  );
};

const AllOrders = () => {
  const orders = [
    {
      _id: "7463hvbfbhfbrtr28820221",
      orderItems: [
        {
          name: "Iphone 14 pro max",
        },
      ],
      totalPrice: 120,
      orderStatus: "Processing",
    },
  ];

  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "status",
      headerName: "status",
      minwidth: 130,
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
      field: "",
      flex: 1,
      minwidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
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
  //  order && orders.forEach((item) => {
  //      row.push({
  //         id: item._id,
  //         itemsQty: item.orderItems.length,
  //         total: "US$" + item.totalPrice,
  //         status: item.orderStatus,
  //      });
  //  });
  orders.forEach((item) => {
    row.push({
      id: item._id,
      itemsQty: item.orderItems.length,
      total: "US$" + item.totalPrice,
      status: item.orderStatus,
    });
  });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const AllRefundOrders = () => {
  const orders = [
    {
      _id: "7463hvbfbhfbrtr28820221",
      orderItems: [
        {
          name: "Iphone 14 pro max",
        },
      ],
      totalPrice: 120,
      orderStatus: "Processing",
    },
  ];
  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "status",
      headerName: "status",
      minwidth: 130,
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
      field: "",
      flex: 1,
      minwidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
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

  orders.forEach((item) => {
    row.push({
      id: item._id,
      itemsQty: item.orderItems.length,
      total: "US$" + item.totalPrice,
      status: item.orderStatus,
    });
  });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const TrackOrder = () =>{
       const orders = [
    {
      _id: "7463hvbfbhfbrtr28820221",
      orderItems: [
        {
          name: "Iphone 14 pro max",
        },
      ],
      totalPrice: 120,
      orderStatus: "Processing",
    },
  ];
     const columns = [
       {field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7},
         {
      field: "status",
      headerName: "status",
      minwidth: 130,
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
      minwidth: 130,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
              <Button>
                <MdOutlineTrackChanges size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];
    const row = [];

      orders.forEach((item) => {
    row.push({
      id: item._id,
      itemsQty: item.orderItems.length,
      total: "US$" + item.totalPrice,
      status: item.orderStatus,
    });
  });

  return (
       <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  )
}

const PaymentMethod = () =>{
     return(
       <div className="w-full px-5"> 
       <div className="flex w-full items-center justify-between">
           <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
               Payment Methods
           </h1>
           <div className={`${styles.button} rounded-md`}>
             <span className="text-[#fff] ">Add New</span>
           </div>
       </div>
        <br />
        <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10">
              <div className="flex items-center">
                   <img 
                   src="https://bonik-react.vercel.app/assets/images/payment-methods/Visa.svg" 
                   alt="" />
                   <h5 className="pl-5 font-[600]">Shahriar Sajeeb</h5>
              </div>
              <div className="pl-8 flex items-center">
                  <h6>12344 **** *** ****</h6>
                  <h5 className="pl-6">11/2024</h5>
              </div>
              <div className="min-w-[10%] flex items-center justify-between pl-8">
                <AiOutlineDelete size={25} className="cursor-pointer"/>
              </div>
        </div>
       </div>
     )
}

const Address =() =>{
    return (
           <div className="w-full px-5"> 
       <div className="flex w-full items-center justify-between">
           <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
             My  Addresses
           </h1>
           <div className={`${styles.button} rounded-md`}>
             <span className="text-[#fff] ">Add New</span>
           </div>
       </div>
        <br />
        <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10">
              <div className="flex items-center">
                   <h5 className="pl-5 font-[600]">Default</h5>
              </div>
              <div className="pl-8 flex items-center">
                  <h6>299 Erdman Passage, New Zoietown, paraguay </h6>
              </div>
               <div className="pl-8 flex items-center">
                  <h6>(221) 340-9768</h6>
              </div>
              <div className="min-w-[10%] flex items-center justify-between pl-8">
                <AiOutlineDelete size={25} className="cursor-pointer"/>
              </div>
        </div>    
       </div>
    )
}
export default ProfileContent;
