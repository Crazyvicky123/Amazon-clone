import {React,useEffect,useState} from 'react'

const Right = ({iteam}) => {



  const [price,setPrice] = useState(0);

  useEffect(()=>{
    totalAmount();
  },[iteam])

  const totalAmount = ()=>{
    let price = 0;
    iteam.map((item)=>{
      price = item.price.cost + price
    });
    setPrice(price)
  }
  return (
    <div id="right_buy">
        <img id="right_buyimg" src="https://images-eu.ssl-images-amazon.com/images/G/31/checkout/assets/TM_desktop._CB443006202_.png" alt="" />
        <div id="cost_right">
            <p id="cost_rightp">Your Order is Eligible for FREE Delivery</p> <br />
            <span style={{color:"#565959"}}>Select this option at Checkout. Details</span>
            <h3 id="cost_righth3">Subtotal ({iteam.length} items) : <span style={{fontWeight:"700"}}>₹{price}.00</span></h3>
            <button id="rightbuy_btn">Proceed to Buy</button>
            <div id="emi">
                Emi available
            </div>
        </div>
      
    </div>
  )
}

export default Right
