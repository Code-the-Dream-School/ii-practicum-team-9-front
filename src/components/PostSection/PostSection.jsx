import './PostSection.css';

const PostSection = ({ title, description, image }) => {
  return (
    <div className="post-section">
      <h3>{title}</h3>
      <div className="post-card">
        <img src={image} alt="Post" className="post-image" />
        <p>{description}</p>
        <button className="barter-btn">Barter</button>
      </div>
    </div>
  );
};

export default PostSection;

