import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

import { GetCurrentUser } from "../apicalls/users";

function ProtectedPage({ children }) {
  const navigate = useNavigate();

  const [user, SetUser] = useState("");

  const validateToken = async () => {
    try {
      const response = await GetCurrentUser();
      if (response.success) {
        SetUser(response.data);
      } else {
        navigate("/login");
        message.error(response.message);
      }
    } catch (error) {
      navigate("/login");
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      validateToken();
    } else {
      navigate("/login");
    }
  }, []);

  return <div>
    {user.name}
    {children}
    </div>;
}

export default ProtectedPage;
