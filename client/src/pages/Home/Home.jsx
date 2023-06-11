import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { message, Divider } from 'antd';

import { GetProducts } from '../../apicalls/products';
import { SetLoader } from '../../redux/loadersSlice';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const [filters, setFilters] = useState({
    status: 'approved',
  });

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetProducts(filters);
      dispatch(SetLoader(false));
      if (response.success) {
        setProducts(response.products);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div>
        {products?.map((product) => {
          return (
            <div
              className="flex cursor-pointer flex-col gap-2 rounded border border-solid border-gray-300 pb-2"
              key={product._id}
              onClick={() => navigate(`/product/${product._id}`)}
            >
              <img
                src={product.images[0]}
                className="h-52 w-full rounded-md object-cover p-2"
                alt=""
              />
              <div className="flex flex-col px-2">
                <h1 className="text-lg font-semibold">{product.name}</h1>
                <p className="text-sm">
                  {product.age} {product.age === 1 ? ' year' : ' years'} old
                </p>
                <Divider />
                <span className="text-xl font-semibold text-green-700">
                  $ {product.price}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Home;
