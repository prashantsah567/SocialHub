import React,{useState} from "react";
import './Post.css';

const Post = (props) => {
    const {userData} = props
    const [countUpvote, setCountUpvote] = useState(0);
    const [countComment, setCountComment] = useState(0);

    if(userData.length === 0){
        return <div>No post yet</div>
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

    const handleUpvote = () => {
        setCountUpvote(countUpvote+1);
    }

    const handleComment = () => {
        setCountComment(countComment+1);
    }

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
                            {user.postImage && <img src={`data:image/png;base64,${user.postImage}`} alt="cannot load" width="100%" height="auto"/>}
                        </div>
                        <hr />
                        <div className="count-upvote-comment">
                            <p>{countUpvote} <small>Upvote</small></p>
                            <p>{countComment} <small>Comments</small></p>
                        </div>
                        <div className="post-upvote-comment">
                            <button className="upvote" onClick={handleUpvote}>Upvote</button>
                            <button className="comment" onClick={handleComment}>Comment</button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Post;