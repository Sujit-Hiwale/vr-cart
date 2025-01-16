import React from 'react';

const Profile = () => {
  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <div className="profile-info">
        <img
          src="https://via.placeholder.com/150"
          alt="Profile"
          className="profile-image"
        />
        <div className="profile-details">
          <h2>John Doe</h2>
          <p>Email: john.doe@example.com</p>
          <p>Location: New York, USA</p>
        </div>
      </div>
      <button>Edit Profile</button>
    </div>
  );
};

export default Profile;
