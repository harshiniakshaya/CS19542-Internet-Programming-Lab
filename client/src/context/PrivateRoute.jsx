import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import Cookies from 'js-cookie';

export const PrivateRoute = ({ element }) => {
  const isAuthenticated = Cookies.get('auth'); // Check if the cookie exists

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return element;
}

// import { Navigate } from "react-router-dom";
// import { useAuth } from "./AuthProvider";

// export const PrivateRoute = ({ component: Component }) => {
//   const { isAuthenticated } = useAuth(); // Get auth state from context

//   if (!isAuthenticated) {
//     return <Navigate to="/login" />;
//   }

//   return <Component />; // Render the protected component
// };
