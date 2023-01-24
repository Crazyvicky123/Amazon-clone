import React, { useState } from 'react'
import { NavLink } from "react-router-dom";
import { Divider } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [udata, setUdata] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    cpassword: ''

  });
  console.log(udata);

  const adddata = (e) => {
    const { name, value } = e.target;
    setUdata(() => {
      return {
        ...udata,
        [name]: value
      }
    })
  };
  const senddata = async (e) => {
    e.preventDefault();
    const { name, email, mobile, password, cpassword } = udata;
    if(name === ""){
      toast.warning("name provide",{
        position:"top-center"
      })
    }else if(email ===""){
      toast.warning("email provide",{
        position:"top-center"

    })
  }
    else if(mobile===""){
      toast.warning("mobile number should be provided",{
        position:"top-center"
    })

    }
    else if (password ===""){
      toast.warning("password must be provided",{
        position:"top-center"
    })

    }
    else if (cpassword ===""){
      toast.warning("cpassword must be provided",{
        position:"top-center"
    })

    }


    const res = await fetch("register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, email, mobile, password, cpassword
      })
    });
    const data = await res.json();
    console.log(data);
    if (res.status === 422) {
      //alert("no data");
      toast.warning("invalid details",{
        position:"top-center",
      })
    } else {
      //alert("datasuccessfully added");
      toast.success("datasuccessfully added",{
        position:"top-center",
      })
      setUdata({ ...udata, name: "", email: "", mobile: "", password: "", cpassword: "" });
    }
  }

  return (
    <section>
      <div id="sign_container">
        <div id="sign_header">
          <img src="./amazonblack.png" alt="amazonlogo" id="img" />
        </div>
        <div id="sign_form">
          <form method="POST">
            <h1 id="h1">Create account</h1>
            <div id="form_data">
              <label htmlFor='your_name' id="label">Your Name</label>
              <input type="text" onChange={adddata} value={udata.name} name="name" id="name" />
            </div>
            <div id="form_data">
              <label htmlFor='email' id="label">Email</label>
              <input type="text" onChange={adddata} value={udata.email} name="email" id="email" />
            </div>
            <div id="form_data">
              <label htmlFor='mobile' id="label">Mobile Number</label>
              <input type="number" onChange={adddata} value={udata.mobile} name="mobile" id="mobile" />
            </div>
            <div id="form_data">
              <label htmlFor='password' id="label">Password</label>
              <input type="password" onChange={adddata} value={udata.password} name="password" id="password" placeholder="at least 6 character" />
            </div>
            <div id="form_data">
              <label htmlFor='cpassword' id="label">Password Again</label>
              <input type="password" onChange={adddata} value={udata.cpassword} name="cpassword" id="password" />
            </div>
            <button id="signin_btn" onClick={senddata}>Continue</button>
            <Divider />
            <div id="signin_info">
              <p id="p4">Already have an account?</p>
              <NavLink to="/login" id="a1">Sign In</NavLink>
              </div>
          </form>
       
      </div>
      <ToastContainer />

    </div>
    </section >
  )
}

export default Signup
