 
import FormModal from '../Form/FormModal';

const CreatePost = ({ setIsOpen }) => {
    return (
        <div>
            <button onClick={() => setIsOpen(true)}>Add Item</button>
        </div>
    );
};

export default CreatePost;
