import React, {useEffect} from "react";
import ShopCreate from "../components/Shop/ShopCreate";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import ShopLogin from "../components/Shop/ShopLogin";

const ShopCreatePage = () => {
  const navigate = useNavigate();
  const { isSeller, seller } = useSelector((state) => state.seller);

  useEffect(() => {
    if (isSeller === true) {
      navigate(`/shop/${isSeller._id}`);
    }
  }, []);
  return (
    <div>
      <ShopCreate />
    </div>
  );
};

export default ShopCreatePage;
