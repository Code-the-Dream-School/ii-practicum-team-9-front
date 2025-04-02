import React from 'react';
import './GuidelinesSection.css';  // Ensure this is the correct path

const GuidelinesSection = () => {
  return (
    <div className="guidelines-section">
      <h2>App Usage Guidelines</h2>
      <p>Welcome to the app! Here's how to get started:</p>
      <ul>
        <li><strong>Post Content:</strong> You can share posts by clicking on the "Add Post" button.</li>
        <li><strong>Explore Posts:</strong> Browse through the posts and see what others have shared.</li>
        <li><strong>Search:</strong> Use the search bar to find specific posts or content.</li>
        <li><strong>Profile:</strong> Update your profile to manage your account information.</li>
        <li><strong>Guidelines:</strong> Follow our community guidelines when posting content.</li>
      </ul>
    </div>
  );
};

export default GuidelinesSection;

 