import React from 'react';

const Library = () => {
  return (
    <div className="library-page">
      <h1>Library</h1>
      <div className="library-items">
        <div className="library-item">
          <img
            src="https://via.placeholder.com/100"
            alt="Item 1"
            className="item-image"
          />
          <div className="item-details">
            <h3>Learning React</h3>
            <p>Video Tutorial</p>
          </div>
        </div>
        <div className="library-item">
          <img
            src="https://via.placeholder.com/100"
            alt="Item 2"
            className="item-image"
          />
          <div className="item-details">
            <h3>JavaScript Essentials</h3>
            <p>Book</p>
          </div>
        </div>
        <div className="library-item">
          <img
            src="https://via.placeholder.com/100"
            alt="Item 3"
            className="item-image"
          />
          <div className="item-details">
            <h3>Introduction to Python</h3>
            <p>Online Course</p>
          </div>
        </div>
      </div>
      <button>Add New Item</button>
    </div>
  );
};

export default Library;
