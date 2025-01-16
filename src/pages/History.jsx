import React from 'react';

const History = () => {
  return (
    <div className="history-page">
      <h1>History</h1>
      <ul className="history-list">
        <li>Viewed "React Basics" - 2 days ago</li>
        <li>Completed "JavaScript Fundamentals" - 1 week ago</li>
        <li>Added "Python for Beginners" to library - 2 weeks ago</li>
      </ul>
      <button>Clear History</button>
    </div>
  );
};

export default History;
