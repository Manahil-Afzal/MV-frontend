import React, { useEffect, useState } from "react";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import ProductDetails from "../components/Products/ProductDetails";
import { useParams, useSearchParams } from "react-router-dom";
import styles from "../styles/styles";
import SuggestedProduct from "../components/Products/SuggestedProduct.jsx";
import { useSelector } from "react-redux";
import { getAllProducts } from "../redux/actions/product.js";
import { useDispatch } from "react-redux";


const ProductDetailsPage = () => {
  const { allProducts } = useSelector((state) => state.products);
  const { allEvents } = useSelector((state) => state.event);
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [searchParams] = useSearchParams();
  const eventData = searchParams.get("isEvent");
  const dispatch = useDispatch(); 
  useEffect(() => {
    if (eventData !== null) {
      const data = allEvents && allEvents.find((i) => i._id === id);
      setData(data);
    } else {
      const data = allProducts && allProducts.find((i) => i._id === id);
      setData(data);
    }
  }, [allProducts, allEvents]);

//  useEffect(() => {
//     if (!allProducts || allProducts.length === 0) {
//       dispatch(getAllProducts());
//     }
//   }, [allProducts, dispatch]);

//   useEffect(() => {
//     if (allProducts && allProducts.length > 0) {
//       const product = allProducts.find((i) => i._id === id);
//       setData(product);
//     }
//   }, [allProducts, id]);

console.log(allProducts);

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
