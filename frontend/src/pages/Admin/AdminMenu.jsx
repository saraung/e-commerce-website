import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { Button, Drawer, List, ListItem, ListItemText, IconButton } from "@mui/material";
import ListIcon from '@mui/icons-material/List';
const AdminMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <IconButton
        onClick={toggleMenu}
        sx={{
          position: "fixed",
          top: 12,
          left: 12,
          bgcolor: "black",
          p: 2,
          borderRadius: "8px",
          zIndex: 999,
          marginTop:"70px",
          width:"50px",
          color: "white",
        }}
      >
        <ListIcon></ListIcon>
      </IconButton>

      <Drawer
        anchor="left"
        open={isMenuOpen}
        onClose={toggleMenu}
        sx={{ width: 240}}
      >
        <List sx={{ bgcolor: "#151515", color: "white", height: "100%" }}>
          <ListItem>
            <ListItemText primary={<NavLink to="/admin/dashboard" style={({ isActive }) => ({ color: isActive ? "greenyellow" : "white", textDecoration: "none" })}>Admin Dashboard</NavLink>} />
          </ListItem>
          <ListItem>
            <ListItemText primary={<NavLink to="/admin/categorylist" style={({ isActive }) => ({ color: isActive ? "greenyellow" : "white", textDecoration: "none" })}>Create Category</NavLink>} />
          </ListItem>
          <ListItem>
            <ListItemText primary={<NavLink to="/admin/productlist" style={({ isActive }) => ({ color: isActive ? "greenyellow" : "white", textDecoration: "none" })}>Create Product</NavLink>} />
          </ListItem>
          <ListItem>
            <ListItemText primary={<NavLink to="/admin/allproductslist" style={({ isActive }) => ({ color: isActive ? "greenyellow" : "white", textDecoration: "none" })}>All Products</NavLink>} />
          </ListItem>
          <ListItem>
            <ListItemText primary={<NavLink to="/admin/userlist" style={({ isActive }) => ({ color: isActive ? "greenyellow" : "white", textDecoration: "none" })}>Manage Users</NavLink>} />
          </ListItem>
          <ListItem>
            <ListItemText primary={<NavLink to="/admin/orderlist" style={({ isActive }) => ({ color: isActive ? "greenyellow" : "white", textDecoration: "none" })}>Manage Orders</NavLink>} />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default AdminMenu;
