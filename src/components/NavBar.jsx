import React from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="navbar-container">
      <nav className="navbar">
        <div className="logo">
          <NavLink to="/search">
            <img
              src="https://cdn-icons-png.flaticon.com/512/259/259164.png"
              style={{ width: "45px", height: "45px" }}
            />
          </NavLink>
        </div>
        <ul className="nav-links">
          <li>
            <NavLink to="/favorites">My Favorite Recipes</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact Us</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
