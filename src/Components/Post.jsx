import React from "react";
import './Post.css';

const Post = (props) => {
    const {userData} = props

    if (userData.length === 0) {
        return <div>No Post yet</div>
    }

    return(
        <div>
            {
                userData.map((user) =>(
    
                    <div className="post-card" key={user.id}>
                        <div className="post-header">
                            <p>{user.username}</p>
                        </div>
                        <div className="post-body">
                            <p>{user.post_detail}</p>
                        </div>
                        <hr />
                        <div className="post-like-comment">
                            <button>Like</button>
                            <button>comment</button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Post;