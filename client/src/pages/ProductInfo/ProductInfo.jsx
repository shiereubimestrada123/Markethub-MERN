import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { message, Divider } from 'antd';
import moment from 'moment'

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

            <Divider />

            <div>
              <h1 className="text-gray-600">Added On</h1>
              <span className="text-gray-600">
                {moment(product.createdAt).format("MMM D , YYYY hh:mm A")}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div>
              <h1 className="text-2xl font-semibold text-orange-900">
                {product.name}
              </h1>
              <span>{product.description}</span>
            </div>
            <Divider />
            <div className="flex flex-col">
              <h1 className="text-2xl font-semibold text-orange-900">
                Product Details
              </h1>
              <div className="flex justify-between mt-2">
                <span>Price</span>
                <span>$ {product.price}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Category</span>
                <span className="uppercase">{product.category}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Bill Available</span>
                <span> {product.billAvailable ? "Yes" : "No"}</span>
              </div>

              <div className="flex justify-between mt-2">
                <span>Box Available</span>
                <span>{product.boxAvailable ? "Yes" : "No"}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Accessories Available</span>
                <span>{product.accessoriesAvailable ? "Yes" : "No"}</span>
              </div>

              <div className="flex justify-between mt-2">
                <span>Warranty Available</span>
                <span>{product.warrantyAvailable ? "Yes" : "No"}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Purchased Year</span>
                <span>
                    {moment().subtract(product.age , 'years').format("YYYY")} ({product.age} years ago)
                </span>
              </div>
            </div>
            <Divider />
            <div className="flex flex-col">
              <h1 className="text-2xl font-semibold text-orange-900">
                Seller Details
              </h1>
              <div className="flex justify-between mt-2">
                <span>Name</span>
                <span> {product.seller.name}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Email</span>
                <span className="uppercase">{product.seller.email}</span>
              </div>
            </div>
            <Divider />
          </div>
        </div>
      </>
    )
  );
}

export default ProductInfo;
