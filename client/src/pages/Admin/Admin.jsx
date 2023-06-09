import { Tabs } from "antd";
import Products from "./Products";

function Admin() {
  const items = [
    {
      key: '1',
      label: 'Products',
      children: <Products />,
    },
    {
      key: '2',
      label: 'Users',
      children: 'Users',
    }
  ];

  return (
    <>
      <Tabs defaultActiveKey="1" items={items} />
    </>
  );
}

export default Admin;
