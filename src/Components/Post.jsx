import React from "react";
import './Post.css';

const Post = (props) => {
    const {userData} = props

    if (userData.length === 0) {
        return <div>No Post yet</div>
    }
    //format the time and date
    const formattedUsers = userData.map((user)=>{
        const {id, created_at, username, post_detail, postImage} = user

        //format the time
        const dateTime = new Date(created_at)
        const date = dateTime.toLocaleDateString("en-US", { month: '2-digit', day: '2-digit', year: 'numeric' })
        const time = dateTime.toLocaleTimeString("en-US", {timeStyle: "medium"})

        return {id, created_at:`${date} ${time}`, username, post_detail, postImage}
    })

    return(
        <div>
            {
                formattedUsers.map((user) =>(
    
                    <div className="post-card" key={user.id}>
                        <div className="post-header">
                            <span className="post-header-username">{user.username}</span>
                            <span className="post-header-time">{user.created_at}</span>
                        </div>
                        <div className="post-body">
                            <p>{user.post_detail}</p>
                        </div>
                        <div className="image">
                            {user.postImage && <img src={`data:image/png;base64,${user.postImage}`} alt="cannot load" width="300" height="200" />}
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