import { useEffect } from 'react';
import{useLocation, Navigate} from 'react-router-dom';

const ProtectedRoute = ({children}) => {  
  const location = useLocation();  
  const token = sessionStorage.getItem("token");
  
  return token ? children : <Navigate to="/login" state={{ from: location }} replace />; 
}

export default ProtectedRoute
