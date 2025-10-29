import React, { useEffect, useState } from "react";
import { backend_url } from "../../server";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/styles";
import { Link, useNavigate } from "react-router-dom";
import ProfileSidebar from "./ProfileSidebar";
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
} from "react-icons/ai";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { MdOutlineTrackChanges } from "react-icons/md";
import axios from "axios";
import { RxCross1 } from "react-icons/rx";
import toast from "react-hot-toast";
import { Country, State, City } from "country-state-city";
import { updateUserAddress, deleteUserAddress } from "../../redux/actions/user";
import { server } from "../../server";


const ProfileContent = ({ active }) => {
  const { user, error, updateAddressSuccessMessage } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [Update, setUpdate] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (updateAddressSuccessMessage) {
      toast.success(updateAddressSuccessMessage);
    }
  }, [error, updateAddressSuccessMessage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserInformation(name, email, phoneNumber, password));
  };

  console.log(user?.avatar?.url);
  const handleImage = async (e) => {
    const file = e.target.files[0];
    setAvatar(file);

    const formData = new FormData();

    formData.append("image", e.target.files[0]);

    await axios
      .put(`${server}/user/update-avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <div className="w-full ">
      {active === 1 && (
        <>
          <div className="flex justify-center w-full ">
            <div className="relative">
              <img
                src={`${backend_url}${user?.avatar}`}
                className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
                alt=""
              />
              <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-ful  flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  onChange={handleImage}
                />
                <label htmlFor="image">
                  <AiOutlineCamera />
                </label>
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
                    className="w-full  *:px-3 py-1 border border-gray-600 rounded-md outline-none"
                    required
                    value={""}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="w-[50%] flex flex-col  gap-x-4">
                  <label className="mb-1 text-gray-800 font-medium">
                    Email Address
                  </label>
                  <input
                    type="text"
                    className="w-full  px-3 py-1 border border-gray-600 rounded-md outline-none"
                    required
                    value={""}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-row w-full gap-3">
                <div className="w-[50%] flex flex-col">
                  <label className="mb-1 text-gray-800 font-medium">
                    Phone Numbers
                  </label>
                  <input
                    type="number"
                    className="w-full   px-3 py-1 border border-gray-600 rounded-md outline-none"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>

                <div className="w-[50%] flex flex-col">
                  <label className="mb-1 text-gray-800 font-medium">
                    Enter Your Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-3  py-1 border border-gray-600 rounded-md outline-none"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <input
                className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
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

      {/* password method  */}
      {active === 6 && (
        <div>
          <ChangePassword />
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

const TrackOrder = () => {
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
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
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
  );
};

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordChangeHandler = async (e) => {
  e.preventDefault();

  try {
    console.log({ oldPassword, newPassword, confirmPassword }); // debug
    const res = await axios.put(
      `${server}/user/update-user-password`,
      { oldPassword, newPassword, confirmPassword },
      { withCredentials: true }
    );

    toast.success(res.data.message);
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || "Error updating password");
  }
};

  return (
    <div className="w-full px-5">
      <h1 className="block text-[25px] text-center font-[600] text-[#000000ba] pb-2">
        Change Password
      </h1>
      <div className="w-full">
        <form
          aria-required
          onSubmit={passwordChangeHandler}
          className="flex flex-col items-center"
        >
          <div className=" w-[50%] 800px:w-[50%] mt-5">
            <label className="block pb-2">Enter your old password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className=" w-[50%] 800px:w-[50%] mt-2">
            <label className="block pb-2">Enter your new password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className=" w-[50%] 800px:w-[50%] mt-2">
            <label className="block pb-2">Enter your confirm password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <input
              className={`w-[95%] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
              required
              value="Update"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

const Address = () => {
  const [open, setOpen] = useState(false);
      const [country, setCountry] = useState("");
      const [city, setCity] = useState("");
      const [zipCode, setZipCode] = useState();
      const [address1, setAddress1] = useState("");
      const [address2, setAddress2] = useState("");
      const [addressType, setAddressType] = useState("");
      const {user} = useSelector((state) => state.user);
      const dispatch = useDispatch();

      const addressTypeData = [
      {
        name: "Default",
    },
      {
        name: "Home",
    },
      {
        name: "Office",
    },
      ];

  const handleSubmit = async (e) => {
        e.preventDefault();

      if (addressType === "" || country === "" || city === "") {
        toast.error("Please fill all the fields!");
    } else {
        dispatch(
          updateUserAddress(
            Country,
            City,
            address1,
            address2,
            addressType,
            zipCode
          )
        );


      toast.success("Address saved successfully!");
      setOpen(false);
      setCountry("");
      setCity("");
      setAddress1("");
      setAddress2("");
      setZipCode("");
      setAddressType("");
    }
  };

  const handleDelete = (item) => {
        dispatch(deleteUserAddress(item._id));
  };


      return (
      <div className="w-full px-5">
        {open && (
          <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center">
          <div className="w-[50%] h-[90vh] bg-white rounded-lg shadow-lg relative overflow-y-scroll">
              <div className="w-full flex justify-end p-3">
                <RxCross1
                  size={30}
                  className="cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>
              <h1 className="text-center text-[25px] font-Poppins">
                Add new Address
              </h1>
              <div className="w-full">
                <form aria-required onSubmit={handleSubmit} className="w-full">
                  <div className="w-full block p-4">
                    <div className="w-full pb-2">
                      <label className="block pb-2">Country</label>
                      <select
                        name=""
                        id=""
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-[95%] border h-[40px] rounded-[5px]"
                      >
                        <option value="" className="block  border pb-2">
                          choose your country
                        </option>
                        {Country &&
                          Country.getAllCountries().map((item) => (
                            <option
                              className="block pb-2"
                              key={item.isoCode}
                              value={item.isoCode}
                            >
                              {item.name}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div className="w-full pb-2">
                      <label className="block pb-2">Country your City</label>
                      <select
                        name=""
                        id=""
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-[95%] border h-[40px] rounded-[5px]"
                      >
                        <option value="" className="block  border pb-2">
                          choose your city
                        </option>
                        {State &&
                          State.getStatesOfCountry(country).map((item) => (
                            <option
                              className="block pb-2"
                              key={item.isoCode}
                              value={item.isoCode}
                            >
                              {item.name}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div className="w-full pb-2">
                      <label className="block pb-2">Address 1</label>
                      <input
                        type="address"
                        className={`${styles.input}`}
                        required
                        value={address1}
                        onChange={(e) => setAddress1(e.target.value)}
                      />
                    </div>
                    <div className="w-full pb-2">
                      <label className="block pb-2">Address 2</label>
                      <input
                        type="address"
                        className={`${styles.input}`}
                        required
                        value={address2}
                        onChange={(e) => setAddress2(e.target.value)}
                      />
                    </div>

                    <div className="w-full pb-2">
                      <label className="block pb-2">Zip Code</label>
                      <input
                        type="number"
                        className={`${styles.input}`}
                        required
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                      />
                    </div>
                    <div className="w-full pb-2">
                      <label className="block pb-2">Address Type</label>
                      <select
                        name=""
                        id=""
                        value={addressType}
                        onChange={(e) => setAddressType(e.target.value)}
                        className="w-[95%] border h-[40px] rounded-[5px]"
                      >
                        <option value="" className="block  border pb-2">
                          Choose your Address Type
                        </option>
                        {addressTypeData &&
                          addressTypeData.map((item) => (
                            <option
                              className="block pb-2"
                              key={item.name}
                              value={item.name}
                            >
                              {item.name}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div className="w-full pb-2">
                      <input
                        type="submit"
                        className={`${styles.input} mt-5 cursor-pointer`}
                        required
                        readOnly
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
        <div className="flex w-full items-center justify-between">
          <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
            My Addresses
          </h1>
          <div
            className={`${styles.button} rounded-md`}
            onClick={() => setOpen(true)}
          >
            <span className="text-[#fff] ">Add New</span>
          </div>
        </div>
        <br />
        {
          user && Array.isArray(user.addresses) && user.addresses.length > 0 ? (
            user.addresses.map((item, index) => (
              <div
                key={index}
                className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10"
              >
                <div className="flex items-center">
                  <h5 className="pl-5 font-[600]">{item.addressType || "Default"}</h5>
                </div>

                <div className="pl-8 flex items-center">
                  <h6>{`${item.address1}, ${item.city}, ${item.country}`}</h6>
                </div>

                <div className="pl-8 flex items-center">
                  <h6>{user?.phoneNumber}</h6>
                </div>

                <div className="min-w-[10%] flex items-center justify-between pl-8">
                  <AiOutlineDelete
                    size={25}
                    className="cursor-pointer"
                    onClick={() => handleDelete(item)}
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 mt-3">No addresses found.</p>
          )
        }

      </div>
      );
};
      export default ProfileContent;
