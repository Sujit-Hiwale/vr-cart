import React from "react";
import Banner from "../components/Banner";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import "./first.css";

const products = [
  { id: 1, image: "/assets/images/product1.jpg", title: "Laptop", price: "$999.99" },
  { id: 2, image: "/assets/images/product2.jpg", title: "Smartphone", price: "$799.99" },
  { id: 3, image: "/assets/images/product3.jpg", title: "Headphones", price: "$199.99" },
  { id: 4, image: "/assets/images/product4.jpg", title: "Tablet", price: "$499.99" },
  { id: 5, image: "/assets/images/product5.jpg", title: "Smartwatch", price: "$299.99" },
];

const First = () => {
  return (
    <div className="first">
      <Banner />
      <h2>Featured Products</h2>
      <div className="products-container">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            image={product.image}
            title={product.title}
            price={product.price}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default First;
