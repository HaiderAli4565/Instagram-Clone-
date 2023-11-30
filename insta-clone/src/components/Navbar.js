import React, { useContext } from "react";
import logo from "../image/logo.png";
import "../css/Navbar.css";
import { Link } from "react-router-dom"; //To avoid refresh
import { LoginContext } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";

export default function Navbar({ login }) {
  const nevigate = useNavigate()

  const { setModalOpen } = useContext(LoginContext)

  // For desktop view
  const loginStatus = () => {
    const token = localStorage.getItem("jwt")
    if (login || token) {
      return [
        <>
          <Link to="/profile">
            <li>Profile</li>
          </Link>
          <Link to="/createPost">
            Create Post
          </Link>
          <Link style={{ marginLeft: "20px" }} to="/followingpost">My Followng</Link>
          <Link to={""}>
            <button className="primaryBtn" onClick={() => { setModalOpen(true) }}>Log Out</button>
          </Link>
        </>
      ]
    }
    else {
      return [
        <>
          <Link to="/signup">
            <li>SignUp</li>
          </Link>
          <Link to="/signin">
            <li>SignIn</li>
          </Link>
        </>
      ]
    }
  }

// For Mobile View 
  const loginStatusMobile = () => {
    const token = localStorage.getItem("jwt")
    if (login || token) {
      return [
        <>
          <Link to="/">
            <li><span class="material-symbols-outlined">
              home
            </span></li>
          </Link>

          <Link to="/profile">
            <li><span class="material-symbols-outlined">
              person
            </span></li>
          </Link>
          <Link to="/createPost">
            <li><span class="material-symbols-outlined">
              add_circle
            </span></li>
          </Link>
          <Link style={{ marginLeft: "20px" }} to="/followingpost">
            <li><span class="material-symbols-outlined">
              explore
            </span></li>
          </Link>
          <Link to={""}>
            <li onClick={() => { setModalOpen(true) }}><span class="material-symbols-outlined">
              logout
            </span></li>
          </Link>
        </>
      ]
    }
    else {
      return [
        <>
          <Link to="/signup">
            <li>SignUp</li>
          </Link>
          <Link to="/signin">
            <li>SignIn</li>
          </Link>
        </>
      ]
    }
  }
  // Nevigate to home page
  return (
    <div className="navbar">
      <img id="insta-logo" src={logo} alt="" onClick={() => { nevigate("/") }} />
      <ul className="nav-menu">
        {loginStatus()}
      </ul>
      <ul className="nav-mobile">
        {loginStatusMobile()}
      </ul>

    </div>
  );
}