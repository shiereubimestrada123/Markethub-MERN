import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { message, Divider } from 'antd';

import { GetProductById } from '../../apicalls/products';
import { SetLoader } from '../../redux/loadersSlice';

function ProductInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetProductById(id);
      dispatch(SetLoader(false));
      if (response.success) {
        setProduct(response.data);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };
console.log(product)
  useEffect(() => {
    getData();
  }, []);

  return (
    product && (
      <>
        <div className="mt-5 grid grid-cols-2 gap-5">
          <div className="flex flex-col gap-5">
            <img
              src={product.images[selectedImageIndex]}
              alt=""
              className="h-96 w-full rounded-md object-cover"
            />

            <div className="flex gap-5">
              {product.images.map((image, index) => {
                return (
                  <img
                    key={image[index]}
                    className={
                      'h-20 w-20 cursor-pointer rounded-md object-cover ' +
                      (selectedImageIndex === index
                        ? 'border-2 border-dashed border-green-700 p-2'
                        : '')
                    }
                    onClick={() => setSelectedImageIndex(index)}
                    src={image}
                    alt={image}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </>
    )
  );
}

export default ProductInfo;
