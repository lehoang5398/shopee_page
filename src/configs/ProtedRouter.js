import { Navigate } from "react-router-dom";
import { HOME_PAGE, LOGIN_PAGE } from ".";

const ProtectedRoute = ({
    user,
    // redirectPath = HOME_PAGE,
    children,
  }) => {
    if (Object.keys(user)?.length === 0) {
      return  <Navigate to={LOGIN_PAGE} replace />
    }
  
    return children;
  };

  export default ProtectedRoute;