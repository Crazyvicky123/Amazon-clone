import React, { useEffect } from 'react'
import Banner from './Banner';
import './home.css';
import Slide from './Slide'
import { getProducts } from '../redux/action/Action';
import{useDispatch,useSelector} from "react-redux";

    
const Maincomp = () => {

  const {products} = useSelector(state => state.getproductsdata);
  console.log(products);

  const dispatch = useDispatch();

  useEffect(()=>{
      dispatch(getProducts());
  },[dispatch]);
  

  return (
    <div className='home_section'>
        <div className='banner_part'>
            <Banner />
            
            
        </div>
       <div id="slide_part">
        <div id="left_slide">
          <Slide title="Deal's of the Day" products={products} />
        </div>
        <div id="right_slide">
          <h4>Festival Latest Launches</h4>
          <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/Wireless/Jupiter/Launches/T3/DesktopGateway_CategoryCard2x_758X608_T3._SY608_CB639883570_.jpg" alt="" id="img2"/>
           <a href='www.google.com' id="a">See More</a>
        </div>
       </div>
       <Slide title="Today's Deal" products={products}/>
       <div  id="center_image">
        <img src="https://m.media-amazon.com/images/G/31/AMS/IN/970X250-_desktop_banner.jpg" alt="center_image" />
       </div>

       <Slide title="Best Seller" products={products} />
       <Slide title="Upto 80% offer" products={products} />
    </div>
  )
}

export default Maincomp
