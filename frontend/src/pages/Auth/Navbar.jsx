import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Drawer, Box, MenuItem, Avatar, Badge, Menu, Typography } from '@mui/material';
import { AiOutlineHome, AiOutlineShopping, AiOutlineShoppingCart } from 'react-icons/ai';
import { FaHeart } from 'react-icons/fa';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";



const activeLinkStyle = {
  color: 'blue', // Active color
  fontWeight: 'bold', // Optional: make active link bold
  textDecoration: 'none',
};


const defaultLinkStyle = {
  textDecoration: 'none', // Remove underline
  color: 'white', // Default color
};

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const favorites = useSelector((state) => state.favorites);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // State to manage dropdown menu
  const dispatch = useDispatch();
  const [logoutApiCall] = useLogoutMutation();
  const navigate=useNavigate(); 

  const toggleDrawer = (state) => () => {
    setOpen(state);
  };

  const handleMenuItemClick = () => {
    setOpen(false);
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      handleMenuClose(); // Close the dropdown after logout
      navigate('/login')
    } catch (error) {
      console.error(error);
    }
  };

  const activeLinkStyle = { color: '#FFD700', fontWeight: 'bold' };
  const defaultLinkStyle = { color: 'white' };

  const favoriteCount = favorites.length;

  return (
    <>
      {/* AppBar for Desktop */}
      <AppBar position="fixed" sx={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: '2rem' }}>
            <NavLink to="/" style={({ isActive }) => (isActive ? activeLinkStyle : defaultLinkStyle)}>
              <AiOutlineHome  size={26} />
            </NavLink>
            <NavLink to="/shop" style={({ isActive }) => (isActive ? activeLinkStyle : defaultLinkStyle)}>
              <AiOutlineShopping size={26} />
            </NavLink>
            <NavLink to="/cart" style={({ isActive }) => (isActive ? activeLinkStyle : defaultLinkStyle)}>
              <Badge badgeContent={cartItems.reduce((a, c) => a + c.qty, 0)} color="error">
                <AiOutlineShoppingCart size={26} />
              </Badge>
            </NavLink>
            <NavLink to="/favorite" style={({ isActive }) => (isActive ? activeLinkStyle : defaultLinkStyle)}>
              <Badge badgeContent={favoriteCount} color="error">
                <FaHeart size={26} />
              </Badge>
            </NavLink>
          </Box>

            <Typography variant='h4' sx={{fontWeight:"bold",color:"#FFD700",fontStyle:"italic",fontFamily:"cursive"}}>BAT STORE</Typography>

          {/* User Avatar or Login Links */}
          {userInfo ? (
            <>
              <Avatar
                onClick={handleAvatarClick}
                sx={{ cursor: 'pointer', bgcolor: '#FFD700', color: "black" }}
              >
                {userInfo.username.charAt(0).toUpperCase()}
              </Avatar>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  style: {
                    backgroundColor: 'black',
                    color: 'white',
                  },
                }}
              >
                {userInfo.isAdmin ? (
                  <>
                    <MenuItem onClick={handleMenuClose}>
                      <NavLink to="/admin/dashboard" style={defaultLinkStyle}>Dashboard</NavLink>
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose}>
                      <NavLink to="/admin/allproductslist" style={defaultLinkStyle}>Products</NavLink>
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose}>
                      <NavLink to="/admin/categorylist" style={defaultLinkStyle}>Category</NavLink>
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose}>
                      <NavLink to="/admin/orderlist" style={defaultLinkStyle}>Orders</NavLink>
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose}>
                      <NavLink to="/admin/userlist" style={defaultLinkStyle}>Users</NavLink>
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose}>
                      <NavLink to="/profile" style={defaultLinkStyle}>Profile</NavLink>
                    </MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem onClick={handleMenuClose}>
                      <NavLink to="/profile" style={defaultLinkStyle}>Profile</NavLink>
                    </MenuItem>
                  </>
                )}
                <MenuItem onClick={logoutHandler}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: '1rem' }}>
              <Link to="/login" style={defaultLinkStyle}>Login</Link>
              <Link to="/register" style={defaultLinkStyle}>Register</Link>
            </Box>
          )}

          {/* Menu Icon for Mobile */}
          <IconButton edge="end" sx={{ display: { xs: 'flex', md: 'none' } }} onClick={toggleDrawer(true)}>
            <MenuIcon sx={{ color: 'white' }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile */}
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ minWidth: '60vw', p: 2, backgroundColor: 'black', color: 'white' ,height:"100%"}}>
          <MenuItem onClick={handleMenuItemClick}>
            <NavLink to="/" style={({ isActive }) => (isActive ? activeLinkStyle : defaultLinkStyle)}>HOME</NavLink>
          </MenuItem>
          <MenuItem onClick={handleMenuItemClick}>
            <NavLink to="/shop" style={({ isActive }) => (isActive ? activeLinkStyle : defaultLinkStyle)}>SHOP</NavLink>
          </MenuItem>
          <MenuItem onClick={handleMenuItemClick}>
            <NavLink to="/cart" style={({ isActive }) => (isActive ? activeLinkStyle : defaultLinkStyle)}>CART</NavLink>
          </MenuItem>
          <MenuItem onClick={handleMenuItemClick}>
            <NavLink to="/favorite" style={({ isActive }) => (isActive ? activeLinkStyle : defaultLinkStyle)}>FAVORITE</NavLink>
          </MenuItem>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
