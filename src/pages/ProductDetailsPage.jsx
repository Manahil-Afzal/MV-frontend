import React, { useEffect, useState } from "react";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import ProductDetails from "../components/Products/ProductDetails";
import { useParams, useSearchParams } from "react-router-dom";
import styles from "../styles/styles";
// import { productData } from "../static/data";  
import SuggestedProduct from "../components/Products/SuggestedProduct.jsx";
import { useSelector } from "react-redux";



const ProductDetailsPage = () => {
  const { allProducts } = useSelector((state) => state.products);
  const { allEvents } = useSelector((state) => state.event);
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [searchParams] = useSearchParams();
  const eventData = searchParams.get("isEvent");


  useEffect(() => {
    if (eventData !== null) {
      const data = allEvents && allEvents.find((i) => i._id === id);
      console.log(data);
      setData(data);
    } else {  
      if(allProducts ){
         const data = allProducts.find((i) => i._id === id);
      console.log(data);
         setData(data);
      }
     
    }
  }, [allProducts, allEvents]);
console.log(id);
  return ( 
    <div>
      <Header />
      <ProductDetails data={data} />
      {
        eventData && (
           <>
             {data && <SuggestedProduct data={data}/>}
           </>
        )
      }
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
