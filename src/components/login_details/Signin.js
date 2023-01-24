import React, { useState,useContext} from 'react'
import './Signup.css';
import {NavLink,useNavigate} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginContext } from '../context/ContextProvider';

const Signin = () => {

  const [logdata,setData]=useState({
    email:"",
    password:""
  });
  console.log(logdata);

  const { account, setAccount } = useContext(LoginContext);

  const history = useNavigate();



  const adddata = (e) =>{
    const {name,value} = e.target;
    setData(()=>{
      return{
        ...logdata,
        [name]:value
      }
    })
  }

  const senddata = async (e) => {
    e.preventDefault();

    const { email, password } = logdata;

    const res = await fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email, password
        })
    });


    const data = await res.json();
    console.log(data);

    if(res.status === 400 || !data){
        console.log("invalid details");
        toast.warn("invalid details",{
            position: "top-center",
        })
    }else{
        console.log("data valid");
        setAccount(data)
        toast.success("user valid",{
            position: "top-center",
        })
        setData({...logdata,email:"",password:""});
        history("/")
    }
}
  return (
    <>
      <section>
        <div id="sign_container">
          <div id="sign_header">
            <img src="./amazonblack.png" alt="amazonlogo" id="img"/>
          </div>
          <div id="sign_form">
            <form method='POST'>
              <h1  id="h1">Sign-In</h1>
              <div id="form_data">
                <label htmlFor='email' id="label">Email</label>
                <input type="text" onChange={adddata} 
                value={logdata.email} name="email" id="email" />
              </div>
              <div id="form_data">
                <label htmlFor='password' id="label">Password</label>
                <input type="password" onChange={adddata} value={logdata.password} name="password" id="password" placeholder="at least 6 character" />
              </div>
              <button id="signin_btn" onClick={senddata}>Continue</button>
            </form>

          </div>
          <div id="create_accountinfo">
            <p id="p1">New to Amazon</p>
            <NavLink to="/register"><button id="button2">Create Your Amazon Account</button></NavLink>
          </div>
        
        </div>
        <ToastContainer />
      </section>

    </>
  )
}

export default Signin

