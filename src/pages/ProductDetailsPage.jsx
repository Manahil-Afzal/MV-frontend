import React, { useEffect, useState } from "react";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import ProductDetails from "../components/Products/ProductDetails";
import { useParams } from "react-router-dom";
import styles from "../styles/styles";
import { productData } from "../static/data";  
import SuggestedProduct from "../components/Products/SuggestedProduct.jsx";
import { useSelector } from "react-redux";



const ProductDetailsPage = () => {
  const {allProducts} = useSelector((state) => state.products);
  const { id } = useParams();
  const [data, setData] = useState(null);
  
  useEffect(() => {
    const data = allProducts && allProducts.find((i) => i._id === name);
    setData(data);
  }, [data, allProducts]);
    // console.log(data);
  return ( 
    <div>
      <Header />
      <ProductDetails data={data} />
      {
        data && <SuggestedProduct data={data} />
      }
      <Footer />
    </div>
  ); 
};

export default ProductDetailsPage;
