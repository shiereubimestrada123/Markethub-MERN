import { useEffect } from "react";
import { Tabs } from "antd";
import Products from "./Products";
import Users from "./Users";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);

  useEffect(() => {
    if (user.role !== "admin") {
      navigate("/");
    }
  }, [navigate, user.role]);

  const items = [
    {
      key: '1',
      label: 'Products',
      children: <Products />,
    },
    {
      key: '2',
      label: 'Users',
      children: <Users />,
    }
  ];

  return (
    <>
      <Tabs defaultActiveKey="1" items={items} />
    </>
  );
}

export default Admin;
