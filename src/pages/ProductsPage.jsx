import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import styles from "../styles/styles";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../redux/actions/product";
import { useSearchParams, useParams } from "react-router-dom";
import axios from "axios";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { allProducts } = useSelector((state) => state.products);
  const [data, setData] = useState([]);
  const [product, setProduct] = useState(null); 
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const { slug } = useParams();


  // Fetch all products if not already fetched
  useEffect(() => {
    if (!allProducts || allProducts.length === 0) {
      dispatch(getAllProducts());
    }
  }, [dispatch, allProducts]);

 

  // Filter/sort products
  useEffect(() => {
    if (allProducts && allProducts.length > 0) {
      let filteredData = [...allProducts];

      if (categoryData) {
        filteredData = filteredData.filter(
          (p) => p.categorySlug === categoryData
        );
      }
      // Sort by sold_out if needed
      filteredData.sort((a, b) => b.sold_out - a.sold_out);

      setData(filteredData);
    }
  }, [allProducts, categoryData]);

  return (
    <div>
      <Header activeHeading={3} />

      <div className={`${styles.section} py-8`}>
        {slug ? (
          product ? (
            <div>
              <h2>{product.name}</h2>
              <img src={product.images[0]} alt="" />
              <p>{product.description}</p>
            </div>
          ) : (
            <h1 className="text-center py-20">Loading product...</h1>
          )
        ) : data.length === 0 ? (
          <h1 className="text-center w-full text-[20px] py-20">
            No Product Found!
          </h1>
        ) : (
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 mb-12">
            {data.map((product, idx) => (
              <ProductCard data={product} key={idx} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ProductsPage;
