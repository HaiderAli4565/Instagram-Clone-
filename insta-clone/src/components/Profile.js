import React from "react";
import "./Profile.css";

export default function Profile() {
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
                    <h1>Esha Eman</h1>
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
                <img src="https://images.unsplash.com/photo-1621342261924-3e2f6c9603f5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c3F1YXJlJTIwaW1hZ2V8ZW58MHx8MHx8fDA%3D" alt="" />
                <img src="https://images.unsplash.com/photo-1621342261924-3e2f6c9603f5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c3F1YXJlJTIwaW1hZ2V8ZW58MHx8MHx8fDA%3D" alt="" />
                <img src="https://images.unsplash.com/photo-1621342261924-3e2f6c9603f5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c3F1YXJlJTIwaW1hZ2V8ZW58MHx8MHx8fDA%3D" alt="" />
                <img src="https://images.unsplash.com/photo-1621342261924-3e2f6c9603f5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c3F1YXJlJTIwaW1hZ2V8ZW58MHx8MHx8fDA%3D" alt="" />
            </div>


        </div>
    )
}