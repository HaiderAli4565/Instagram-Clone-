import React from "react";
import './Home.css';

export default function Home() {
    return (
        <div className="home">
            {/* card */}
            <div className="card">
                {/*card header*/}
                <div className="card-header">
                    <div className="card-pic">
                        <img src="https://images.unsplash.com/photo-1621342261924-3e2f6c9603f5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c3F1YXJlJTIwaW1hZ2V8ZW58MHx8MHx8fDA%3D" alt="" />
                    </div>
                    <h5> Esha</h5>
                </div>
                {/*card image*/}
                <div className="card-image">
                    <img src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTV8fHRlY2hub2xvZ3l8ZW58MHx8MHx8fDA%3D" alt="" />
                </div>
                {/*card content*/}
                <div className="card-content">
                    <span className="material-symbols-outlined">
                        favorite
                    </span>
                    <p>1 Like</p>
                    <p>This is amazing</p>
                </div>
                {/*add comment*/}
                <div className="add-comment">
                    <span className="material-symbols-outlined">
                        mood
                    </span>
                    <input type="text" placeholder="Add a comment"/>
                    <button className="comment">Post</button>
                </div>

            </div>
        </div>
    )
}