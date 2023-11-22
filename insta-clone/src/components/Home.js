import React, { useEffect, useState } from "react";
import './Home.css';
import { json, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [data, setData] = useState([])
  const [comment, setComment] = useState("")

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


  });

  const likePost = (id) => {
    fetch("http://localhost:5000/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((posts) => {
          if (posts._id === result._id) {
            return result;
          } else {
            return posts;
          }
        });
        setData(newData);
        console.log(result);
      });
  };
  const unlikePost = (id) => {
    fetch("http://localhost:5000/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((posts) => {
          if (posts._id === result._id) {
            return result;
          } else {
            return posts;
          }
        });
        setData(newData);
        console.log(result);
      });
  };
  // function to make comment
  const makeComment = (text, id) => {
    fetch("http://localhost:5000/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        text: text,
        postId: id,
      }),
    }).then((res) => res.json())
      .then((result) => {
        console.log(result)
      });
  };


  return (
    <div className="home">
      {/* card */}
      {data.map((posts) => {
        return (
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
              <img src={posts.photo} alt="" />
            </div>
            {/*card content*/}
            <div className="card-content">
              {
                posts.likes.includes(JSON.parse(localStorage.getItem("user"))._id) ?
                  (<span className="material-symbols-outlined material-symbols-outlined-red" onClick={() => { unlikePost(posts._id) }} >
                    favorite
                  </span>) : (
                    <span className="material-symbols-outlined" onClick={() => { likePost(posts._id) }} >
                      favorite
                    </span>
                  )
              }


              <p>{posts.likes.length} Likes</p>
              <p>{posts.body}</p>
            </div>
            {/*add comment*/}
            <div className="add-comment">
              <span className="material-symbols-outlined">
                mood
              </span>
              <input type="text" placeholder="Add a comment" value={comment} onChange={(e) => { setComment(e.target.value) }} />
              <button className="comment" onClick={() => { makeComment(comment, posts._id) }}>Post</button>
            </div>

          </div>

        )
      })}

    </div>
  )
}