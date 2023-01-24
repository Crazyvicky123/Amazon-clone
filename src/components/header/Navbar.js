import { React, useContext,useEffect,useState } from 'react'
import './navbar.css';
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Avatar from '@mui/material/Avatar';
import  IconButton  from '@mui/material/IconButton';
import MenuIcon from '@mui/material/Menu';
import { useNavigate,NavLink } from "react-router-dom";
import { LoginContext } from "../context/ContextProvider";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import LogoutIcon from '@mui/icons-material/Logout';
import { ToastContainer, toast } from 'react-toastify';
import {useSelector} from "react-redux";

const Navbar = () => {

  const { account, setAccount } = useContext(LoginContext);
  console.log(account);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
      setAnchorEl(null);
  };


  const history = useNavigate();
 const [text,setText] = useState("");
 console.log(text);

  const [liopen,setLiopen] = useState(true);
  const {products} = useSelector(state => state.getproductsdata);

  const getdetailvaliduser = async () => {
    const res = await fetch("/validuser", {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        credentials: "include"
    });

    const data = await res.json();
    console.log(data);

    if (res.status !== 201) {
        console.log("error");
    } else {
        console.log("data valid");
        history("/");
        setAccount(data);
    }
};



// log out user 
const logoutuser = async () => {
  const res2 = await fetch("/logout", {
      method: "GET",
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
      },
      credentials: "include"
  });

  const data2 = await res2.json();
  console.log(data2);

  if (res2.status !== 201) {
      console.log("error");
  } else {
      console.log("data valid log");
      // alert("logout")
      toast.success("user successfully logout", {
          position: "top-center",
      })
      history("/");
      setAccount(false);

  }
};

const getText =(iteams)=>{
  setText(iteams)
  setLiopen(false)

}


useEffect(() => {
  getdetailvaliduser()
}, []) //react-hooks/exhaustive-deps react-hooks/exhaustive-deps




  



  return (

    <header>
      <nav>
        <div className='left'>
          <IconButton id="hamburger">
            <MenuIcon style={{color:"#fff"}} />
            </IconButton>
          <div className='navlogo'>
            <NavLink to="/"> <img src="amazon.png" alt='' /> </NavLink>
          </div>
          <div className='nav_searchbar'>
            <input type="text" name=""  onChange={(e)=>getText(e.target.value)}
            id="" placeholder="Search for the products" />
            <div className='search_icon'>
              <SearchIcon />

            </div>
            {
                            text &&
                            <List className='extrasearch' hidden={liopen}>
                                {
                                    products.filter(product => product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product => (
                                        <ListItem>
                                            <NavLink to={`/getproductsone/${product.id}`} onClick={() => setLiopen(true)} >
                                                { product.title.longTitle }
                                        </NavLink>
                                          
                                        </ListItem>
                                    ))
                                }
                    </List>
                        }
             </div>
             


        </div>
        <div className='right'>
          <div className='nav_btn'>
            <NavLink to="/login">Signin</NavLink>
          </div>
          <div className='cart_btn'>
            {
              account ? <NavLink to="/buynow">
                <Badge badgeContent={account.carts.length} color="secondary">
                  <ShoppingCartIcon id="icon" />

                </Badge>

              </NavLink> : <NavLink to="/login">
                <Badge badgeContent={0} color="secondary">
                  <ShoppingCartIcon id="icon" />

                </Badge>

              </NavLink>
            }
            <ToastContainer />

            <p>Cart</p>
          </div>
          
          { 
          account ? 
            <Avatar id="avatar2"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}>{account.name[0].toUpperCase()}</Avatar>:<Avatar id="avatar1" 
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}></Avatar>
            }


          <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >

                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    {
                        account ? <MenuItem onClick={handleClose} onClick={logoutuser}><LogoutIcon style={{ fontSize: 16, marginRight: 3 }} />Logout</MenuItem> : ""
                    }

                </Menu>


        </div>
      </nav>
    </header>


  )
}

export default Navbar
