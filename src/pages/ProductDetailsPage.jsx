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
  // const { id } = useParams();
  const [data, setData] = useState(null);
  const [searchParams] = useSearchParams();
  const eventData = searchParams.get("isEvent");
  const isEvent = searchParams.get("isEvent");
  const dispatch = useDispatch(); 
  const { slug } = useParams();

// useEffect(() => {
//   if (eventData !== null) {
//     const data = allEvents && allEvents.find((i) => i.slug === slug);
//     setData(data);
//   } else {
//     const data = allProducts && allProducts.find((i) => i.slug === slug);
//     setData(data);
//   }
// }, [allProducts, allEvents, slug]);

 useEffect(() => {
    if (isEvent === "true") {
      const eventData = allEvents && allEvents.find((i) => i.slug === slug);
      setData(eventData);
    } else {
      const productData = allProducts && allProducts.find((i) => i.slug === slug);
      setData(productData);
    }
  }, [allProducts, allEvents, slug, isEvent]);

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
