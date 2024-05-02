import React, { useEffect, useState } from "react";
import "./Collections.scss";
import Product from "../../components/product/Product";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { axiosClient } from "../../utils/AxiosClient";

function Collection() {
  const navigate = useNavigate();
  const [products, setProduct] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const params = useParams();
  const categories = useSelector((state) => state.categoryReducer.categories);

  // SORTING
  const sortOptions = [
    {
      value: "Price -Low to High",
      sort: "Price",
    },
    {
      value: "Newest First",
      sort: "createdAt",
    },
  ];
  const [sortBy, setSortBy] = useState(sortOptions[0].sort);

  // FETcHING pRODUCTS
  async function fetchProduct() {
    const url = params.categoryId
      ? `/products?populate=image&filters[category][key][$eq]=${params.categoryId}&sort=${sortBy}`
      : `/products?populate=image&sort=${sortBy}`;
    const response = await axiosClient.get(url);
    setProduct(response.data.data);
  }
  // Update Category:
  function updateCategory(e) {
    navigate(`/category/${e.target.value}`);
  }
  // UseEffect:
  useEffect(() => {
    setCategoryId(params.categoryId);
    fetchProduct();
  }, [params, sortBy]);
  return (
    <div className="Categories">
      <div className="container">
        <div className="header">
          <div className="info">
            <h2>Explore All Prints and Artwork </h2>
            <p>
              Pakistan's Largest collectioins of wall poster for your bed room{" "}
            </p>
          </div>
          <div className="sort-by">
            <div className="sort-by-container">
              <h3 className="sort-by-text">Sort By</h3>
              <select
                className="select-sort-by"
                name="sort-by"
                id="sort-by"
                onChange={(e) => setSortBy(e.target.value)}
              >
                {sortOptions.map((item) => (
                  <option key={item.sort} value={item.sort}>
                    {item.value}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="filter-box">
            <div className="category-filter">
              <h3>Category</h3>
              {categories.map((item) => (
                <div key={item.id} className="filter-radio">
                  <input
                    name="category"
                    value={item.attributes.key}
                    onChange={updateCategory}
                    type="radio"
                    id={item.id}
                    checked={item.attributes.key === categoryId}
                  />
                  <label htmlFor={item.id}>{item.attributes.title} </label>
                </div>
              ))}
            </div>
          </div>

          <div className="product-box">
            {products.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Collection;
