import React from "react";
import './Post.css';

const Post = () => {

    return(
        <div className="post-card">
            <div className="post-header">
                <p>username</p>
            </div>
            <div className="post-body">
                <p>This is a new post</p>
            </div>
            <div className="post-like-comment">
                <p>Like</p>
                <p>comment</p>
            </div>
        </div>
    )
}

export default Post;