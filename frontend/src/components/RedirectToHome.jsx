import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RedirectToHome = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // If the user refreshes and the route is not "/"
    if (location.pathname !== "/") {
      navigate("/");
    }
  }, [location, navigate]);

  return null; // This component doesn't render anything
};

export default RedirectToHome;
