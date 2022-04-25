import { Navigate } from "react-router-dom";
import { HOME_PAGE } from ".";

const ProtectedRoute = ({
    checkPage,
    // redirectPath = HOME_PAGE,
    children,
  }) => {
    if (Object.keys(checkPage)?.length > 0) {
      return <Navigate to={HOME_PAGE} replace />;
    }
  
    return children;
  };

  export default ProtectedRoute;