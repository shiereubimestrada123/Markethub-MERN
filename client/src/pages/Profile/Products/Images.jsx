import { useState } from 'react'
import { useDispatch } from "react-redux";
import { Upload, Button, message } from 'antd'
import { SetLoader } from '../../../redux/loadersSlice';

function Images({ selectedProduct, getData, setShowProductForm }) {
  const dispatch = useDispatch();

  const [file = null, setFile] = useState(null);

  const handleImageUpload = (info) => {
    setFile(info.file);
  }

  const handleUpload = () => {
    try {
      dispatch(SetLoader(true));
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  }

  return (
    <>
      <Upload
        listType="picture"
        beforeUpload={() => false}
        onChange={handleImageUpload}
      >
        <Button type='dashed'>
          Upload Image
        </Button>
      </Upload>

      <div className="flex justify-end gap-5 mt-5">
        <Button type="default" onClick={() => { setShowProductForm(false)}}>
          Cancel
        </Button>

        <Button type="primary" disabled={!file} onClick={handleUpload}>
          Upload
        </Button>
      </div>
    </>
  )
}

export default Images