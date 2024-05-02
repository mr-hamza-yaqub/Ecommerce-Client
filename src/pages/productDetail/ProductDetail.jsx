import React, { useEffect, useState } from "react";
import "./ProductDetail.scss";
import { useParams } from "react-router-dom";
import { axiosClient } from "../../utils/AxiosClient";
import Loader from "../../components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/CartSlice";

function ProductDetail() {
  const params = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);

  const cart = useSelector((state) => state.cartReducer.cart);
  const quantity =
    cart.find((item) => item.key === params.productId)?.quantity || 0;

  async function fetchData() {
    const productResponse = await axiosClient.get(
      `/products?filters[key][$eq]=${params.productId}&populate=*`
    );

    if (productResponse.data.data.length > 0) {
      setProduct(productResponse.data.data[0]);
    }
  }
  useEffect(() => {
    setProduct(null);
    fetchData();
  }, [params]);

  if (!product) {
    return <Loader />;
  }
  return (
    <div className="ProductDetail">
      <div className="container">
        <div className="product-layout">
          <div className="product-img  ">
            <img
              src={product?.attributes?.image.data.attributes.url}
              alt="Product-Img"
            />
          </div>
          <div className="product-info">
            <h1 className="heading">{product?.attributes?.title}</h1>
            <h3 className="price">₹ {product?.attributes?.Price}</h3>
            <p className="description">{product?.attributes?.Desc}</p>
            <div className="cart-options">
              <div className="quantity-selector">
                {/* Actually -->removeFromCart(product) :-here product is the action.payload a currItem which is defined in the cartSlice  */}
                <span
                  className="btn increment"
                  onClick={() => dispatch(removeFromCart(product))}
                >
                  -
                </span>
                <span className="quantity">{quantity}</span>
                <span
                  className="btn decrement"
                  onClick={() => dispatch(addToCart(product))}
                >
                  +
                </span>
              </div>
              <button
                className="btn-primary add-to-cart"
                onClick={() => dispatch(addToCart(product))}
              >
                Add to Cart
              </button>
            </div>
            <div className="return-policy">
              <ul className="ul">
                <li>
                  Return request must be raised within 14 days for all items
                  from the date of delivery.All Poterz. Mall items are 100%
                  Authentic by Trusted Brands and are covered under 2x Money
                  Back Guarantee.
                </li>
                <li>
                  {" "}
                  Note: Groceries and Digital Goods are excluded from 2x Money
                  Back Guarantee
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
