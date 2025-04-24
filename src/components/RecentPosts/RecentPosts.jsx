import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../endpoints';
const RecentPosts = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get(`${API_URL}/api/items`)
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
