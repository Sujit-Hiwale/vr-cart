import React from "react";

const Banner = () => {
  return (
    <div className="banner">
      <img src="src/assets/images/banner1.jpg" alt="Promotional Banner" style={{height:160}}/>
      <div className="banner-text">
        <h1>Welcome to ShopEase</h1>
        <p>Find the best deals on your favorite products!</p>
      </div>
    </div>
  );
};

export default Banner;
