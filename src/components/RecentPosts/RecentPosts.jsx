import { useEffect, useState } from 'react';
import axios from 'axios';

const RecentPosts = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/items')
            .then(response => setItems(response.data))
            .catch(error => console.error('There was an error!', error));
    }, []);

    return (
        <div>
            {items.map((item) => (
                <div key={item._id} className="post-card">
                    <img src={item.imageUrl} alt={item.title} />
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <button>Barter</button>
                </div>
            ))}
        </div>
    );
};

export default RecentPosts;
