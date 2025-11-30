import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { AiOutlineEye, AiOutlineDelete } from "react-icons/ai";
import Loader from "../Layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid, renderActionsCell } from "@mui/x-data-grid";
import toast from "react-hot-toast";
import { getAlleventsShop, deleteEvent } from "../../redux/actions/event";
import { backend_url } from "../../server";

const AllEvents = () => {
const { shopEvents, isLoading } = useSelector((state) => state.event);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
   const {id} = useState();
   
useEffect(() => {
   
  if (seller && seller._id) {
    dispatch(getAlleventsShop(seller._id));
  }
}, [dispatch]);


const handleDelete = async (id) => {
     dispatch(deleteEvent(id)); 
    toast.success("Event deleted successfully!");
};


  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 180,
      flex: 0.6,
    },
    {
      field: "Stock",
      headerName: "Stock",
      type: "number",
      minWidth: 180,
      flex: 0.5,
    },
    {
      field: "sold",
      headerName: "Sold out",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },
    {
    field: "Preview",
    renderCell: (params) => {
      return (
        <Link to={`/event/${params.id}`}>
         {/* <Link to={`/product/${params.row.slug}`}> */}
          <Button>
            <AiOutlineEye size={20} />
          </Button>
        </Link>
      );
    },
  },
  {
    field: "Delete",
    renderCell: (params) => {
      return (
        <Button onClick={() => handleDelete(params.id)}>
          <AiOutlineDelete size={20} />
        </Button>
      );
    },
  },
];

  const row = [];
  shopEvents  &&
    shopEvents .forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: "US" + item.discountPrice,
        Stock: item.stock,
       sold: item.sold_out, 

      });
    });


  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-1 pt-1 mt-10 bg-white">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableRowSelectionOnClick
            autoHeight
          />
        </div>
      )}
    </>
  );
};

export default AllEvents;
