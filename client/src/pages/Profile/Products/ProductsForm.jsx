import { useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Modal, Tabs, message } from 'antd';

import { SetLoader } from '../../../redux/loadersSlice';
import { AddProduct, EditProduct } from '../../../apicalls/products';

import AddProductForm from './AddProductForm.jsx';

// eslint-disable-next-line react/prop-types
const ProductsForm = ({ showProductForm, setShowProductForm, selectedProduct, getData }) => {
  const dispatch = useDispatch();

  const formRef = useRef(null);

  const { user } = useSelector((state) => state.users);

  const onFinish = async (values) => {
    try {
      dispatch(SetLoader(true));
      let response = null;
      if (selectedProduct) {
        // eslint-disable-next-line react/prop-types
        response = await EditProduct(selectedProduct._id, values);
      } else {
        values.seller = user._id;
        values.status = "pending";
        response = await AddProduct(values);
      }
      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);
        getData();
        setShowProductForm(false);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  const items = [
    {
      key: '1',
      label: 'General',
      children: <AddProductForm ref={formRef} onFinish={onFinish} selectedProduct={selectedProduct} />,
    },
    {
      key: '2',
      label: 'Images',
      children: 'Images',
    },
  ];

  return (
    <>
      <Modal
        title=''
        open={showProductForm}
        onCancel={() => setShowProductForm(false)}
        centered
        width={1000}
        okText="Save"
        onOk={() => {
          formRef.current.submit();
        }}
      >
        <h1 className="text-primary text-2xl text-center font-semibold uppercase">
          {selectedProduct ? "Edit Product" : "Add Product"}
        </h1>
        <Tabs defaultActiveKey="1" items={items} />
      </Modal>
    </>
  )
}

export default ProductsForm