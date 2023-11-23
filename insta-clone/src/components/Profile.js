import React, { useEffect, useState } from "react";
import "./Profile.css";
import PostDetail from "./PostDetail"

export default function Profile() {
    const [pic, setPic] = useState([]);
    const [show, setShow] = useState(false);
    const [posts, setPosts] = useState([])

    const toggleDetails = (posts) => {
        if (show) {
            setShow(false);
        } else {
            setShow(true);
            setPosts(posts)
        }
    };



    useEffect(() => {
        fetch("http://localhost:5000/myposts", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then(res => res.json())
            .then((result) => {
                setPic(result)
                console.log(pic)
            })
    }, [])
    return (
        <div className="profile">
            {/*Profile frame*/}
            <div className="profile-frame">
                {/*Profile pic*/}
                <div className="profile-pic">
                    <img src="https://images.unsplash.com/photo-1621342261924-3e2f6c9603f5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c3F1YXJlJTIwaW1hZ2V8ZW58MHx8MHx8fDA%3D" alt="" />
                </div>
                {/*Profile data*/}
                <div className="profile-data">
                    <h1>{JSON.parse(localStorage.getItem("user")).name}</h1>
                    <div className="profile-info" style={{ display: "flex" }}>
                        <p> 10 posts</p>
                        <p> 10 followers</p>
                        <p> 10 followings</p>
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
                <PostDetail item={posts} toggleDetails = {toggleDetails} />

            }

        </div>
    )
}