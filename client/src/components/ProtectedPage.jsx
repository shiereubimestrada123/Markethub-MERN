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

  return (
    user && (
      <>
        <div className="flex justify-between items-center bg-primary p-5">
          <h1
            className="text-2xl text-white cursor-pointer"
            onClick={() => navigate("/")}
          >
            SHEY MP
          </h1>

          <div className="bg-white py-2 px-5 rounded flex gap-1 items-center">
            <span
              className="underline cursor-pointer uppercase"
              onClick={() => {
                if (user.role === "user") {
                  navigate("/profile");
                } else {
                  navigate("/admin");
                }
              }}
            >
              {user.name}
            </span>
            <span onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
              </svg>
            </span>
          </div>
        </div>

        {/* body */}
        <div className="p-5">{children}</div>
      </>
    )
  )
}

export default ProtectedPage;
