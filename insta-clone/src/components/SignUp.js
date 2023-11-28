import React, { useState } from "react";
import logo from "../image/logo.png"
import "../css/SignUp.css";
import { Link , useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

export default function SignUp() {
    const navigate = useNavigate()
    const [name, setName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // toast function
    const notifyA = (msg) => toast.error(msg);
    const notifyB = (msg) => toast.success(msg);
    // email Regex
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    // password Regex
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;



    const postData = () => {
        //checking email
        if(!emailRegex.test(email)){
            notifyA("Invalid Email")
            return
        }
        else if(!passRegex.test(password)){
            notifyA("Password must contain atleast 8 charaters including atleast 1 number, 1 upercase and lowercase letter and 1 special character for example #,@,?")
            return
        }


        // sending data to server
        fetch("http://localhost:5000/signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                userName: userName,
                email: email,
                password: password
            })
        }).then(res => res.json())
            .then(data => {
                if(data.error){
                    notifyA(data.error);
                }else{
                    notifyB(data.message)
                    navigate("/signin")
                }
                
                console.log(data)
            })
    }

    return (
        <div className="signup">
            <div className="from-container">
                <div className="form">
                    <img className="signUpLogo" src={logo} alt="" />
                    <p className="loginPara">
                        Sign up to see photos and videos <br /> from your frineds
                    </p>
                    <div>
                        <input type="email" name="email" id="email" value={email}
                            placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} />
                    </div>
                    <div>
                        <input type="text" name="name" id="name" value={name}
                            placeholder="Full Name" onChange={(e) => { setName(e.target.value) }} />
                    </div>
                    <div>
                        <input type="text" name="username" id="username" value={userName}
                            placeholder="Username" onChange={(e) => { setUserName(e.target.value) }} />
                    </div>
                    <div>
                        <input type="password" name="password" id="password" value={password}
                            placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
                    </div>
                    <p className="loginPara" style={{ fontSize: "12px", margin: "3px 0px" }}>
                        By sigining up, you agree to our terms,<br /> privacy policy and cookie policy.
                    </p>

                    <input type="submit" id="submit-btn" value="Sign Up" onClick={() => { postData() }} />

                </div>
                <div className="form2">
                    Already have an account?

                    <Link to="/signin"><span style={{ color: "blue", cursor: "pointer" }}>Sign In</span>
                    </Link>

                </div>
            </div>
        </div>
    )
}