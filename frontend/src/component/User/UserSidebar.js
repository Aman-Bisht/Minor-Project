import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/site.png";
import "./UserSidebar.css";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/">
        <img src={logo} alt="Sellit" />
      </Link>
      <Link to="/account">
        <p>
          <AccountCircleIcon />
          Profile
        </p>
      </Link>
      <Link to="/orders">
        <p>
          <ListAltIcon />
          Orders
        </p>
      </Link>

      <Link to="/cart">
        <p>
          <ShoppingCartIcon />
          Cart
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;
