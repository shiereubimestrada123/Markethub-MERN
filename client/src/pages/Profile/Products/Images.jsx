import { useState } from 'react'
import { useDispatch } from "react-redux";
import { Upload, Button, message } from 'antd'
import { SetLoader } from '../../../redux/loadersSlice';
import { UploadProductImage } from '../../../apicalls/products'

// eslint-disable-next-line react/prop-types
function Images({ selectedProduct, getData, setShowProductForm }) {
  const dispatch = useDispatch();

  const [file = null, setFile] = useState(null);
  const [showPreview = false, setShowPreview] = useState(true);
  // eslint-disable-next-line react/prop-types
  const [images = [], setImages] = useState(selectedProduct.images);

  const handleImageUpload = (info) => {
    setFile(info.file);
    setShowPreview(true);
  }

  const handleUpload = async () => {
    try {
      dispatch(SetLoader(true));
      // Upload Image to Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      // eslint-disable-next-line react/prop-types
      formData.append("productId", selectedProduct._id);
      console.log({formData})
      const response = await UploadProductImage(formData);
      console.log({response})
      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);
        setImages([...images, response.data]);
        setShowPreview(false);
        setFile(null);
        getData();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  }

  return (
    <>
      <div className="flex gap-5 mb-5">
        {images.map((image) => {
          return (
            <div key={image} className="flex gap-2 border border-solid border-gray-500 rounded p-2 items-end">
              <img className="h-20 w-20 object-cover" src={image} alt="" />
              <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </span>
            </div>
          );
        })}
      </div>

      <Upload
        listType="picture"
        beforeUpload={() => false}
        onChange={handleImageUpload}
        showUploadList={showPreview}
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