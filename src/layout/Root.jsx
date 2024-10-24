// Root.jsx
import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

const Root = () => {
  const location = useLocation();

  useEffect(() => {
    // Check if the current path is Home or Dashboard
    const shouldLoadTidio = location.pathname === "/" || location.pathname.startsWith("/dashboard");

    if (shouldLoadTidio) {
      const script = document.createElement("script");
      script.src = "//code.tidio.co/a6vab3qwefqger4viz3zhpg3jt5rxzp2.js";
      script.async = true;
      document.body.appendChild(script);

      // Cleanup script on unmount or route change
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [location]);

  return (
    <div>
      {/* Other layout components */}
      <Outlet />
    </div>
  );
};

export default Root;
