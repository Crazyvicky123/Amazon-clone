import {React,useContext} from 'react'
import "./buynow.css";
import { LoginContext} from "../context/ContextProvider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Option = ({deletedata,get}) => {
  const { account, setAccount } = useContext(LoginContext);

  const removedata = async(req,res)=>{
    try {
      const res =  await fetch(`/remove/${deletedata}`,{
        method:"DELETE",
        headers:{
          Accept:"application/json",
          "Content-type":"application/json"
        },
        credentials:"include"
      });

      const data = await res.json();
      console.log(data);

      if(res.status === 400 || !data){
        console.log("error");
      }
      else{
        console.log("user delete");
        setAccount(data);
        toast.success("successfully deleted from the cart",{
          position: "top-center",
      })
        get();
      }
       
      } catch (error) {
        console.log("error");

    }
    }
  return (
    <div id="add_remove_select">
        <select>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>
        <p id="p4" style={{cursor:"pointer"}} > Delete   </p>
        <p id="p4" style={{cursor:"pointer"}}onClick={()=>removedata(deletedata)}>Save or Later   </p>
        <p id="p4" style={{cursor:"pointer"}}>See More Like This</p>
        <ToastContainer />
      
    </div>
  )
}

export default Option
