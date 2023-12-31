import React, { useEffect, useState } from "react";
import "../css/Profile.css";
import PostDetail from "../components/PostDetail"
import ProfilePic from "../components/ProfilePic";

export default function Profile() {
    var picLink = "https://cdn-icons-png.flaticon.com/128/847/847969.png"
    const [pic, setPic] = useState([]);
    const [show, setShow] = useState(false);
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState("")
    const [changePic, setChangePic] = useState(false) //Change Profile Pic

    //To show and hide post details
    const toggleDetails = (posts) => {
        if (show) {
            setShow(false);
        } else {
            setShow(true);
            setPosts(posts)
        }
    };

    // Change Profile picture
    const changeProfile = () => {
        if (changePic) {
            setChangePic(false)
        } else {
            setChangePic(true)
        }
    }

    // Fetxh Data through mongodb
    useEffect(() => {
        fetch(`http://localhost:5000/user/${JSON.parse(localStorage.getItem("user"))._id}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then(res => res.json())
            .then((result) => {
                console.log(result)
                setPic(result.post)
                setUser(result.user)
                console.log(pic)
            })
    }, [])
    return (
        <div className="profile">
            {/*Profile frame*/}
            <div className="profile-frame">
                {/*Profile pic*/}
                <div className="profile-pic">
                    <img
                        onClick={changeProfile}
                        src={user.Photo ? user.Photo : picLink} alt="" />
                </div>
                {/*Profile data*/}
                <div className="profile-data">
                    <h1>{JSON.parse(localStorage.getItem("user")).name}</h1>
                    <div className="profile-info" style={{ display: "flex" }}>
                        <p> {pic ? pic.length : "0"} Posts</p>
                        <p> {user.followers ? user.followers.length : "0"} Followers </p>
                        <p> {user.following ? user.following.length : "0"} Followings </p>
                    </div>
                </div>
            </div>
            <hr style={{
                width: "90%",
                opacity: "0.8",
                margin: "25px auto",
            }} />
            {/* Gallery */}
            <div className="gallery">
                {pic.map((pics) => {
                    return <img key={pics._id} src={pics.photo}
                        onClick={() => {
                            toggleDetails(pics)
                        }}
                        className="item" alt=""></img>
                })}
            </div>
            {show &&
                <PostDetail item={posts} toggleDetails={toggleDetails} />
            }
            {
                changePic &&
                <ProfilePic changeProfile={changeProfile} />
            }
        </div>
    )
}