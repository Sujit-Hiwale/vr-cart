import React from "react";

const ProductCard = ({ image, title, price }) => {
  return (
    <div className="product-card">
      <img
        src={image} // Assuming the 'image' field contains a valid URL
        alt={title}
        className="product-image"
      />
      <h3>{title}</h3>
      <p>₹{price}</p>
      <button style={{ background: "gray", color: "white" }}>Try on model</button>
    </div>
  );
};

export default ProductCard;
