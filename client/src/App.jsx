import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Admin from './pages/Admin/Admin';
import ProductInfo from './pages/ProductInfo/ProductInfo'

import ProtectedPage from './components/ProtectedPage.jsx';
import Spinner from './components/Spinner.jsx';

function App() {
  const { loading } = useSelector((state) => state.loaders);

  return (
    <>
      {loading && <Spinner />}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedPage>
                <Home />
              </ProtectedPage>
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProtectedPage>
                <ProductInfo />
              </ProtectedPage>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedPage>
                <Admin />
              </ProtectedPage>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedPage>
                <Profile />
              </ProtectedPage>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
