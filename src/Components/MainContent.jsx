import React from "react";
import './MainContent.css';
import Post from './Post';

const MainContent = () =>{

    return(
        <div className="container">
            <div className="row">
                <div className="col1">
                    <div className="post-box">
                        <textarea placeholder="What's on your mind?"></textarea>
                        <button className="btn-img-upload">Add Image</button>
                        <button className="btn-post">Post</button>
                    </div>
                    <div className="posts">
                        {/* this section has the updated contents */}
                        <Post />
                    </div>
                </div>
                <div className="col2">
                    <p className="new-user-header">New Users</p>
                </div>
            </div>
        </div>
    )
}

export default MainContent;