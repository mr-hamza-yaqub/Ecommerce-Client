import React from "react";
import "./Hero.scss";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();
  return (
    <div className="Hero">
      <div className="hero-content center">
        <h2 className="heading">Exclusive Print and Art Work</h2>
        <p className="sub-heading">
          Exclusive Art Prices,for the Exclusive you
        </p>
        <button
          onClick={() => navigate("/category")}
          className="cta btn-primary"
        >
          Explore more
        </button>
      </div>
    </div>
  );
}

export default Hero;
