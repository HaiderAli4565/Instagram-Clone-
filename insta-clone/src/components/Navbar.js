import React, { useContext } from "react";
import logo from "../image/logo.png";
import "./Navbar.css";
import { Link } from "react-router-dom"; //To avoid refresh
import { LoginContext } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";

export default function Navbar({ login }) {
  const nevigate = useNavigate()

  const { setModalOpen } = useContext(LoginContext)

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
  return (
    <div className="navbar">
      <img src={logo} alt="" onClick={() => { nevigate("/") }} />
      <ul className="nav-menu">
        {loginStatus()}
      </ul>
    </div>
  );
}