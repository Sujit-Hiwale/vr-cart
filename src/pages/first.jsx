import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import "./first.css";

const First = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/items/first-products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data.items);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="first">
      <Banner />
      <h2>Featured Products</h2>
      <div className="products-container">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            image={product.image_data}
            title={product.category}
            price={product.price}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default First;
