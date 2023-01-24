import './App.css';
import Navbar from './components/header/Navbar';
import Newnavbar from './components/Newnavbar/Newnavbar';
import Maincomp from './components/home/Maincomp';
import Footer from './components/footer/Footer';
import Signin from './components/login_details/Signin';
import Signup from './components/login_details/Signup';
import { Routes, Route } from "react-router-dom";
import Cart from './components/cart/Cart';
import Buynow from './components/buynow/Buynow';
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect,useState } from 'react';
import Placeorder from './components/Placeorder/Placeorder';

function App() {

  const [data, setData] = useState(false);


  useEffect(() => {
    setTimeout(() => {
      setData(true)
    }, 3000)
  }, [])

  return (
    <>
      {
        data ? (
          <>
            <Navbar />
            <Newnavbar />
            <Routes>
              <Route path="/" element={<Maincomp />} />
              <Route path="/login" element={<Signin />} />
              <Route path="/register" element={<Signup />} />
              <Route path="/getproductsone/:id" element={<Cart />} />
              <Route path="/buynow" element={<Buynow />} />
              <Route path="/placeorder" element={<Placeorder />} />

            </Routes>
            <Footer />
          </>
        ) : (
          <div id='circle'>
            <CircularProgress />
            <h2 id="h2">Loading...</h2>
          </div>
        )
      }

    </>
  );
}

export default App;
