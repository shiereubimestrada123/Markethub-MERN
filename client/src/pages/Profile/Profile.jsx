import { Tabs} from 'antd';

import Products from './Products/Products';

function Profile() {
  const items = [
    {
      key: '1',
      label: 'Products',
      children: <Products />,
    },
    {
      key: '2',
      label: 'Bids',
      children: 'Bids',
    },
    {
      key: '3',
      label: 'General',
      children: 'General',
    },
  ];

  return (
    <>
      <Tabs defaultActiveKey="1" items={items} />
    </>
  )
}

export default Profile