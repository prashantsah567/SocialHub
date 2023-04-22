import React,{useState} from "react";
import './Post.css';
import { createClient } from "@supabase/supabase-js";
import {SUPABASE_URL,SUPABASE_KEY} from '../supabaseConfig';
import {FaTrash} from "react-icons/fa";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const Post = (props) => {
    const {userData}= props;
    const [isLoading, setIsLoading] = useState(false);
    // const [userInfo, setUserInfo] = useState([]);
    const [countUpvote, setCountUpvote] = useState(props.userData.upvote);
    console.log(countUpvote);
    const [countComment, setCountComment] = useState(0);

    if(userData.length === 0){
        return <div><br/>No post yet</div>
    }
    //format the time and date
    const formattedUsers = userData.map((user)=>{
        const {id, created_at, username, post_detail, postImage, upvote} = user

        //format the time
        const dateTime = new Date(created_at)
        const date = dateTime.toLocaleDateString("en-US", { month: '2-digit', day: '2-digit', year: 'numeric' })
        const time = dateTime.toLocaleTimeString("en-US", {timeStyle: "medium"})

        //added code for delete
        // function handleDelete(){
        //     deletePost(id);
        // }

        return {id, created_at:`${date} ${time}`, username, post_detail, postImage, upvote}
    })

    //fetching data from db - PostInfo (table)
    // const fetchData = async() =>{
    //     setIsLoading(true);
    //     const{data, error} = await supabase.from('PostInfo').select('*').order("id",{ascending:false});
    //     setIsLoading(false);
    //     if(error) setError(error.message);
    //     else {
    //         userData(data); 
    //         formattedUsers();
    //     }
    // }

    const handleUpvote = async() => {
        
        setCountUpvote(countUpvote+1);
        const newUpvote = {
            upvote: countUpvote
        }
        console.log(countUpvote);
        //first i need to update the like column in db
        const {data, error} = await supabase.from('PostInfo').update(newUpvote).eq('id',39);
        //then i need to get back the value and display it in the post

    }

    const handleComment = () => {
        setCountComment(countComment+1);
    }

    //to handle the delete operation
    async function deletePost(id){
        
        setIsLoading(true);
        const {data,error} = await supabase.from('PostInfo').delete().eq('id',id);
        if(error){
            console.error('Error deleting row:',error)
        }else{
            console.log("delete success with id: ", id);
        }
        setIsLoading(false);
    }

    //  //to handle the delete operation
    //  const handleDelete = async() =>{
    //     setIsLoading(true);
    //     const {data,error} = await supabase.from('PostInfo').delete().eq('id',47);
    //     if(error){
    //         console.error('Error deleting row:',error)
    //     }else{
    //         console.log("delete success with id: ", id);
    //     }
    //     fetchData();
    //     setIsLoading(false);
    // }

    return(
        <>
        {isLoading ? (<div className='loading'>Loading...</div>):""}
        <div>
            {
                formattedUsers.map((user) =>(
                    
                    <div className="post-card" key={user.id}>
                        <div className="post-header">
                            <span className="user-icon"></span>
                            <span className="post-header-username">{user.username}</span>
                            <span className="post-header-time">Posted at {user.created_at}</span>
                            {(user.username == props.userName)?(<button className="delBtn" onClick={() => deletePost(user.id)}><FaTrash className="delIcon"/></button>):''}
                        </div>
                        <div className="post-body">
                            <p>{user.post_detail}</p>
                        </div>
                        <div className="image">
                            {user.postImage && <img src={`data:image/png;base64,${user.postImage}`} alt="cannot load" width="100%" height="auto"/>}
                        </div>
                        <hr />
                        <div className="count-upvote-comment">
                            <p>{user.upvote} <small>Upvote</small></p>
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
        </>
    )
}

export default Post;