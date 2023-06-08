import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from './pages/Home/Home'
import Profile from "./pages/Profile/Profile.jsx";
import Register from './pages/Register/Register.jsx'
import Login from './pages/Login/Login.jsx'

import ProtectedPage from './components/ProtectedPage.jsx'
import Spinner from  './components/Spinner.jsx'

function App() {
  const { loading } = useSelector((state) => state.loaders);

  return (
    <>
      {loading && <Spinner />}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedPage><Home /></ProtectedPage>} />
          <Route path="/profile" element={<ProtectedPage><Profile /></ProtectedPage>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
