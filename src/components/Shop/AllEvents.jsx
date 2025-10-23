import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { AiOutlineEye, AiOutlineDelete } from "react-icons/ai";
import Loader from "../Layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid, renderActionsCell } from "@mui/x-data-grid";
import toast from "react-hot-toast";
import { getAlleventsShop, deleteEvent } from "../../redux/actions/event";



const AllEvents = () => {
  const { events, isLoading } = useSelector((state) => state.events);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
   
useEffect(() => {
  if (seller && seller._id) {
    dispatch(getAlleventsShop(seller._id));
  }
}, [dispatch, seller]);

  
const handleDelete = (id) => {
  dispatch(deleteEvent(id));
  toast.success("Event Deleted Successfully!");
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
        <Link to={`/event/${params.row.id}`}>
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
        <Button onClick={() => handleDelete(params.row.id)}>
          <AiOutlineDelete size={20} />
        </Button>
      );
    },
  },
];

  const row = [];
  events &&
    events.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: "US$" + item.discountPrice,
        Stock: item.stock,
        sold: item.soldOut
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
