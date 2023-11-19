import React, { useEffect, useState } from "react";
import './Home.css';
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    const [data, setData] = useState([]) 

    useEffect(() => {

        const token = localStorage.getItem("jwt");
        if (!token) {
            navigate("./signup")
        }

        //fetching all posts
        fetch("http://localhost:5000/allposts", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => setData(result))
            .catch(err => console.log(err))


    }, [])
    return (
        <div className="home">
            {/* card */}
            {data.map((posts)=>{
                return(
                    <div className="card">
                {/*card header*/}
                <div className="card-header">
                    <div className="card-pic">
                        <img src="https://images.unsplash.com/photo-1621342261924-3e2f6c9603f5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c3F1YXJlJTIwaW1hZ2V8ZW58MHx8MHx8fDA%3D" alt="" />
                    </div>
                    <h5> {posts.postedBy.name}</h5>
                </div>
                {/*card image*/}
                <div className="card-image">
                    <img src= {posts.photo} alt="" />
                </div>
                {/*card content*/}
                <div className="card-content">
                    <span className="material-symbols-outlined">
                        favorite
                    </span>
                    <p>1 Like</p>
                    <p>{posts.body}</p>
                </div>
                {/*add comment*/}
                <div className="add-comment">
                    <span className="material-symbols-outlined">
                        mood
                    </span>
                    <input type="text" placeholder="Add a comment" />
                    <button className="comment">Post</button>
                </div>

            </div>

                )
            })}
            
        </div>
    )
}