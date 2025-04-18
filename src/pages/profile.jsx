import React, { useState } from "react";
import styles, { styled } from "styled-components";

const usStates = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
  "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois",
  "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
  "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana",
  "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York",
  "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",
  "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah",
  "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
];

const allInterests = ["Technology", "Art", "Music", "Sports", "Travel", "Reading", "Gaming"];


export default  function profile()   {
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    bio: "",
    location: "",
    interests: [],
  });

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleInterestChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      interests: checked
        ? [...prev.interests, value]
        : prev.interests.filter((i) => i !== value)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    //console.log("Profile Data:", formData);
    if (avatar) {
      console.log("Avatar file:", avatar.name);
    }
  };

  return (
    <Wrapper>
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>My Profile</h2>

      <label>
        Avatar:
        <input type="file" accept="image/*" onChange={handleAvatarChange} />
      </label>
      {preview && <img src={preview} alt="Avatar Preview" className={styles.avatarPreview} />}

      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </label>

      <label>
        Username:
        <input type="text" name="username" value={formData.username} disabled="true" />
      </label>

      <label>
        Bio:
        <textarea name="bio" value={formData.bio} onChange={handleChange} />
      </label>

      <label>
        Location:
        <select name="location" value={formData.location} onChange={handleChange}>
          <option value="">Select a state</option>
          {usStates.map((state) => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </label>

      <fieldset>
        <legend>Interests:</legend>
        {allInterests.map((interest) => (
          <label key={interest} className={styles.checkboxLabel}>
            <input
              type="checkbox"
              value={interest}
              checked={formData.interests.includes(interest)}
              onChange={handleInterestChange}
            />
            {interest}
          </label>
        ))}
      </fieldset>

      <button type="submit">Save Profile</button>
    </form>
    </Wrapper>
  );
};


const Wrapper = styled.section`
.form {
  max-width: 500px;
  margin: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  background: #f9f9f9;
}

// label {
//   display: flex;
//   flex-direction: column;
//   font-weight: bold;
// }

// input[type="text"],
// textarea,
// select {
//   padding: 0.5rem;
//   margin-top: 0.25rem;
//   font-size: 1rem;
// }

// .checkboxLabel {
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
// }

// .avatarPreview {
//   width: 100px;
//   height: 100px;
//   object-fit: cover;
//   margin-top: 0.5rem;
//   border-radius: 50%;
// }

// button {
//   padding: 0.7rem;
//   background: #4CAF50;
//   color: white;
//   border: none;
//   border-radius: 8px;
//   font-size: 1rem;
//   cursor: pointer;
// }

// button:hover {
//   background: #45a049;
// }

`
