import React,{useEffect, useState} from 'react'
import "./buynow.css";
import { Divider } from '@mui/material';
import Option from './Option';
import Subtotal from './Subtotal';
import Right from './Right';

const Buynow = () => {
    const [cartdata, setCartdata] = useState("");
    console.log(cartdata)

    const getdatabuy = async () => {
        const res = await fetch("/cartdetails", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        const data = await res.json();

        if (res.status !== 201) {
            console.log("error");
        } else {
            setCartdata(data.carts);
        }
    };


    useEffect(() => {
        getdatabuy();
    }, []);
    return (
        <>
        {
            cartdata.length ? <div id='buynow_section'>
                <div id='buynow_container'>
                    <div id="left_buy">
                        <h1 id="headind">Shopping Cart</h1>
                        <p id="subheading">Select all items</p>
                        <span id='leftbuyprice'>Price</span>
                        <Divider />

                        {
                            cartdata.map((e, k) => {
                                return (
                                    <>
                                        <div id="item_container">
                                            <img src={e.url} alt="" id="item_containerimg" />
                                            <div id="item_details">
                                                <h3 id="title">{e.title.longTitle} </h3>
                                                <h3>{e.title.shortTitle} </h3>
                            
                                                <p id='unusuall'>Usually dispatched in 8 days.</p>
                                                <p id="item_detailsp">Eligible for FREE Shipping</p>
                                                <img src="https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px-2x._CB485942108_.png" alt="" id="items_detailsimg"/>
                                                <Option deletedata={e.id} get={getdatabuy} />
                                            </div>
                                            <h3 id='item_price'>₹{e.price.cost}.00</h3>
                                        </div>
                                        <Divider />
                                    </>
                                )
                            })
                        }

                       
                        <Subtotal iteam={cartdata} />
                    </div>
                    <Right iteam={cartdata} />
                </div>
            </div> : ""
        }

        </>
    )
        ;
};

export default Buynow
