/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, message, Table, Divider } from 'antd';
import moment from 'moment';

import { GetAllBids } from '../../../apicalls/products';

import { SetLoader } from '../../../redux/loadersSlice';

function Bids({ showBidsModal, setShowBidsModal, selectedProduct }) {
  const dispatch = useDispatch();

  const [bidsData, setBidsData] = useState([]);

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetAllBids({
        product: selectedProduct._id,
      });
      dispatch(SetLoader(false));
      if (response.success) {
        setBidsData(response.data);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: 'Bid Placed On',
      dataIndex: 'createdAt',
      render: (text) => {
        return moment(text).format('DD-MM-YYYY hh:mm a');
      },
    },
    {
      title: 'Name',
      dataIndex: 'name',
      render: (record) => {
        return record?.buyer?.name;
      },
    },
    {
      title: 'Bid Amount',
      dataIndex: 'bidAmount',
    },
    {
      title: 'Bid Date',
      dataIndex: 'createAt',
      render: (text) => {
        return moment(text).format('DD-MM-YYYY hh:mm a');
      },
    },
    {
      title: 'Message',
      dataIndex: 'message',
    },
    {
      title: 'Contact Details',
      dataIndex: 'contactDetails',
      render: (text, record) => {
        return (
          <div>
            <p>Phone: {record.mobile}</p>
            <p>Email: {record.buyer.email}</p>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    if (selectedProduct) {
      getData();
    }
  }, [selectedProduct]);

  return (
    <Modal
      title=""
      open={showBidsModal}
      onCancel={() => setShowBidsModal(false)}
      centered
      width={1500}
      footer={null}
    >
      <div className="flex flex-col gap-3">
        <h1 className=" text-primary">Bids</h1>
        <Divider />
        <h1 className="text-xl text-gray-500">
          Product Name: {selectedProduct.name}
        </h1>

        <Table
          columns={columns}
          dataSource={bidsData}
          rowKey={(record) => record._id}
        />
      </div>
    </Modal>
  );
}

export default Bids;
