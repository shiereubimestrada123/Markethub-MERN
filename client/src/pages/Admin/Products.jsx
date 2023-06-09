import { message, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { GetProducts } from '../../apicalls/products';
import { SetLoader } from '../../redux/loadersSlice';

function Products() {
  const [products, setProducts] = useState([]);
  console.log(products);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetProducts(null);
      console.log(response);
      dispatch(SetLoader(false));
      if (response.success) {
        setProducts(response.products);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  const onStatusUpdate = async (id, status) => {
    console.log(id, status)
  };

  const columns = [
    {
      title: 'Product',
      dataIndex: 'image',
      render: (text, record) => {
        return (
          <img
            src={record?.images?.length > 0 ? record.images[0] : ''}
            alt=""
            className="h-20 w-20 rounded-md object-cover"
          />
        );
      },
    },
    {
      title: 'Product',
      dataIndex: 'name',
    },
    {
      title: 'Seller',
      dataIndex: 'name',
      render: (text, record) => {
        return record?.seller?.name;
      },
    },

    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (text, record) => {
        return record.status.toUpperCase();
      },
    },
    {
      title: 'Added On',
      dataIndex: 'createdAt',
      render: (text, record) =>
        moment(record.createdAt).format('DD-MM-YYYY hh:mm A'),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text, record) => {
        const { status, _id } = record;
        return (
          <div className="flex gap-3">
            {status === 'pending' && (
              <span
                className="cursor-pointer underline"
                onClick={() => onStatusUpdate(_id, 'approved')}
              >
                Approve
              </span>
            )}
            {status === 'pending' && (
              <span
                className="cursor-pointer underline"
                onClick={() => onStatusUpdate(_id, 'rejected')}
              >
                Reject
              </span>
            )}
            {status === 'approved' && (
              <span
                className="cursor-pointer underline"
                onClick={() => onStatusUpdate(_id, 'blocked')}
              >
                Block
              </span>
            )}
            {status === 'blocked' && (
              <span
                className="cursor-pointer underline"
                onClick={() => onStatusUpdate(_id, 'approved')}
              >
                Unblock
              </span>
            )}
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Table
        columns={columns}
        dataSource={products}
        rowKey={(record) => record._id}
      />
    </div>
  );
}

export default Products;
