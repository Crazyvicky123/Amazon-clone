import { Divider } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import "./cart.css";
import {LoginContext} from "../context/ContextProvider";
import CircularProgress from "@mui/material/CircularProgress";
import { NavLink } from 'react-router-dom';

const Cart = () => {

  const { id } = useParams("");
  //console.log(id);
  const history = useNavigate("");

  const {account,setAccount} = useContext(LoginContext);





  const [inddata, setInddata] = useState("");
  console.log(inddata);

 
    const getinddata = async () => {
      const res = await fetch(`/getproductsone/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }

      });

      const data = await res.json();
      console.log(data);

      if (res.status !== 201) {
        console.log("no data available");
      } else {
        console.log("getdata");
        setInddata(data);
      }

    }
    useEffect(() => {
    setTimeout(getinddata,1000)
  }, [id]);
  
// add cart function
const addtocart = async (id) => {
  const checkres = await fetch(`/addcart/${id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      inddata
    }),
    credentials: "include"
  });


  const data1 = await checkres.json();
  console.log(data1);

  if (checkres.status === 401 || !data1) {
    console.log("user invalid ");
    alert("user invalid");
  } else {
    //alert("data added in your cart");
    history("/buynow")
    setAccount(data1)
  
  }

}
  return (

    <div id="cart_section">
      {inddata && Object.keys(inddata).length &&
        <div id="cart_container">
          <div id="left_cart">
            <img src={inddata.url} alt="" id="img6" />
            <div id="cart_btn">
              <button id="cart_btn1" onClick={() => addtocart(inddata.id)} >Add to cart</button>
              <NavLink to="/placeorder"><button id="cart_btn2">Buy Now</button></NavLink>
            </div>
          </div>
          <div id="right_cart">
            <h3 id="title">{inddata.title.shortTitle}</h3>
            <h4 id="subtitle">{inddata.title.longTitle}</h4>
            <Divider />
            <p id="mrp">M.R.P : {inddata.price.mrp}</p>
            <p style={{ color: "#565959" }}>Deals of the day :  <span style={{ color: "#B12704" }}>${inddata.price.cost}</span></p>
            <p style={{ color: "#565959" }}>You save : <span style={{ color: "#B12704" }}>${inddata.price.discount}</span></p>
            <h4 style={{ color: "#b12704" }}>Discount : <span style={{ color: "black" }}>{inddata.discount}</span></h4>
            <h3 style={{ color: " #007185" }}>Free Delivery <span style={{ color: "#111" }}>Aug 8-21 Details </span> {inddata.tagline}</h3>
            <p style={{ color: "#565959" }}>Fastest Delivery : <span style={{ color: "#111" }}>Tomorrow 11Am</span></p>
            <p id="description">About the item : <span style={{ color: "#565959" }}>{inddata.description}</span></p>

          </div>
        </div>
      }
      {!inddata ? <div id='circle'>
        <CircularProgress />
        <h2 id="h2">Loading...</h2>
      </div>:""}
    </div>

  )
}

export default Cart
