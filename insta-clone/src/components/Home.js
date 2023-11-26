import React, { useEffect, useState } from "react";
import './Home.css';
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Home() {
  var picLink = "https://cdn-icons-png.flaticon.com/128/847/847969.png"
  const navigate = useNavigate();
  const [data, setData] = useState([])
  const [comment, setComment] = useState("")
  const [show, setShow] = useState(false)
  const [item, setItem] = useState([])

  // Toast functions
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

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
        const newData = data.map((posts) => {
          if (posts._id === result._id) {
            return result;
          } else {
            return posts;
          }
        });
        setData(newData);
        setComment("")
        notifyB("Comment  posted")
        console.log(result)
      });
  };

  // to show and hide comments
  const toggleComment = (posts) => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
      setItem(posts)
    }
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
                <img src={posts.postedBy.Photo? posts.postedBy.Photo: picLink } alt="" />
              </div>
              <h5>
                <Link to={`/profile/${posts.postedBy._id}`}>
                  {posts.postedBy.name}
                </Link>
              </h5>
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
              <p style={{ fontWeight: "bold", cursor: "pointer" }} onClick={() => { toggleComment(posts) }}>
                View all comments
              </p>
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

      {/*Show comments*/}
      {show && (
        <div className="showComment">
          <div className="container">
            <div className="postPic">
              <img src={item.photo} alt="" />
            </div>
            <div className="details">
              {/*card header*/}
              <div className="card-header" style={{ borderBottom: "1px solid #00000029" }}>
                <div className="card-pic">
                  <img src="https://images.unsplash.com/photo-1621342261924-3e2f6c9603f5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c3F1YXJlJTIwaW1hZ2V8ZW58MHx8MHx8fDA%3D" alt="" />
                </div>
                <h5> {item.postedBy.name}</h5>
              </div>
              {/*Comment Section*/}
              {/* commentSection */}
              <div
                className="comment-section"
                style={{ borderBottom: "1px solid #00000029" }}
              >
                {item.comments.map((comment) => {
                  return (
                    <p className="comm">
                      <span
                        className="commenter"
                        style={{ fontWeight: "bolder" }}
                      >
                        {comment.postedBy.name}{" "}
                      </span>
                      <span className="commentText">{comment.comment}</span>
                    </p>
                  );
                })}
              </div>

              {/*card content*/}
              <div className="card-content">
                <p>{item.likes.length} Likes</p>
                <p> {item.body} </p>
              </div>
              {/*add comment*/}
              <div className="add-comment">
                <span className="material-symbols-outlined">
                  mood
                </span>
                <input type="text" placeholder="Add a comment" value={comment} onChange={(e) => { setComment(e.target.value) }} />
                <button className="comment" onClick={() => { makeComment(comment, item._id); toggleComment(); }}>Post</button>
              </div>
            </div>
          </div>
          <div className="closeComment" onClick={() => { toggleComment() }}>
            <span className="material-symbols-outlined material-symbols-outlined-comment">
              close
            </span>
          </div>
        </div>
      )


      }

    </div>
  )
}