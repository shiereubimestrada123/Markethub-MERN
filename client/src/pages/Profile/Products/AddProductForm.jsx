import { forwardRef, useEffect, useState } from 'react';
import { Form, Input, Row, Col } from 'antd';
import TextArea from 'antd/es/input/TextArea';

const additionalThings = [
  {
    label: 'Bill Available',
    name: 'billAvailable',
  },
  {
    label: 'Warranty Available',
    name: 'warrantyAvailable',
  },
  {
    label: 'Accessories Available',
    name: 'accessoriesAvailable',
  },
  {
    label: 'Box Available',
    name: 'boxAvailable',
  },
];

const rules = [
  {
    required: true,
    message: 'Required',
  },
];

// eslint-disable-next-line react/prop-types
const AddProductForm = forwardRef(({ onFinish, selectedProduct }, ref) => {
  useEffect(() => {
    if (selectedProduct) {
      ref.current.setFieldsValue(selectedProduct);
    }
  }, [ref, selectedProduct]);

  return (
    <>
      <Form layout="vertical" ref={ref} onFinish={onFinish}>
        <Form.Item label="Name" name="name" rules={rules}>
          <Input type="text" />
        </Form.Item>
        <Form.Item label="Description" name="description" rules={rules}>
          <TextArea type="text" />
        </Form.Item>

        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Form.Item label="Price" name="price" rules={rules}>
              <Input type="number" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Category" name="category" rules={rules}>
              <select>
                <option value="">Select</option>
                <option value="electronics">Electronics</option>
                <option value="fashion">Fashion</option>
                <option value="home">Home</option>
                <option value="sports">Sports</option>
              </select>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Age" name="age" rules={rules}>
              <Input type="number" />
            </Form.Item>
          </Col>
        </Row>

        <div className="flex gap-10">
          {additionalThings.map((item) => {
            return (
              <Form.Item
                key={item.name}
                label={item.label}
                name={item.name}
                valuePropName="checked"
              >
                <Input
                  type="checkbox"
                  value={item.name}
                  onChange={(e) => {
                    ref.current.setFieldsValue({
                      [item.name]: e.target.checked,
                    });
                  }}
                  checked={ref.current?.getFieldValue(item.name)}
                />
              </Form.Item>
            );
          })}
        </div>
      </Form>
    </>
  );
});

AddProductForm.displayName = 'AddProductForm';

export default AddProductForm;
