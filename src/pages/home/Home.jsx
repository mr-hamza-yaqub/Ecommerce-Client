import React, { useEffect } from "react";
import Hero from "../../components/heroSection/Hero";
import "./Home.scss";
import Category from "../../components/category/Category";
import Product from "../../components/product/Product";
import { useState } from "react";
import { axiosClient } from "../../utils/AxiosClient";
import { useSelector } from "react-redux";

function Home() {
  const categories = useSelector((state) => state.categoryReducer.categories);

  const [topProducts, setIsProducts] = useState(null);
  async function fetchData() {
    const topProductResponse = await axiosClient.get(
      "/products?filters[isTopPick][$eq]=true&populate=image"
    );

    setIsProducts(topProductResponse.data.data);
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="Home">
      <Hero />
      <section className="collection container">
        <div className="info">
          <h2 className="heading">Shop By Categorries</h2>
          <p className="subheadings">
            Shop From the Best,Our TV Postters and Collections
          </p>
        </div>
        <div className="content">
          {categories?.map((category) => (
            <Category key={category.id} category={category} />
          ))}
        </div>
      </section>

      <section className="collection container">
        <div className="info">
          <h2 className="heading">Our Top Picks</h2>
          <p className="subheadings">All New Design,</p>
        </div>
        <div className="content">
          {topProducts?.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
