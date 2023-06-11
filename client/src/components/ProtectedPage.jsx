import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';

import { GetCurrentUser } from '../apicalls/users';
import { SetLoader } from '../redux/loadersSlice';
import { SetUser } from '../redux/usersSlice'

// eslint-disable-next-line react/prop-types
function ProtectedPage({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.users);

  const validateToken = async () => {
    try {
      dispatch(SetLoader(true))
      const response = await GetCurrentUser();
      console.log(response)
      dispatch(SetLoader(false))
      if (response.success) {
        dispatch(SetUser(response.data));
      } else {
        localStorage.removeItem("token");
        navigate("/login");
        message.error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false))
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
            Markethub
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
