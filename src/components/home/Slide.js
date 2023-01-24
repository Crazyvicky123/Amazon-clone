
import React from 'react'
import { Divider } from '@mui/material';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {NavLink} from "react-router-dom";

import './slide.css';
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,

  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,

  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,

  }
};



const Slide = ({title,products}) => {
  return (
    
    <div id='product_section'>
      <div id="products_deal">
        <h3 id="h3">{title}</h3>
        <button id='view_btn'>View All</button>
      </div>
      <Divider />
      <Carousel
        responsive={responsive}
        infinite={true}
        draggable={false}
        swipeable={true}
        showDots={false}
        centerMode={true}
        autoPlay={true}
        autoPlaySpeed={4000}
        keyBoardControl={true}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        containerClass="carousel-container">
          {
            products.map((e) => {
              
              return(
                <NavLink to={`/getproductsone/${e.id}`}>
              <div id='products_items'>
                <div id='product_img'>
                  <img src={e.url} alt='products_items' id="img1"/>
                </div>
                <p id="p">{e.title.shortTitle}</p>
                <p id="p">{e.discount}</p>
                <p id="p">{e.tagline}</p>
              </div>
              </NavLink>
              )
            })
          }

      </Carousel>
    </div>
  )
}

export default Slide
