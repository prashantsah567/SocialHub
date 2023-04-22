import React, {useState, useEffect} from "react";
import { createClient } from "@supabase/supabase-js";
import {SUPABASE_URL,SUPABASE_KEY} from '../supabaseConfig';
import './MainContent.css';
import Post from './Post';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const MainContent = (props) =>{

    const [userInput, setUserInput] = useState('');
    const [userData, setUserData] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    const [showImageInput, setShowImageInput] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    //to handle the change in user input for post
    const handleTextInput = (e) =>{
        setUserInput(e.target.value);
    }

    const handleImageChange = (e) =>{
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) =>{
            setImageFile(e.target.result);
        };
        reader.readAsDataURL(file);
    }

    const handleImageBtn = () =>{
        setShowImageInput(true);
    }

    //fetching the data
    useEffect(() =>{
        fetchData();
    },[])

    //inserting the user data into supabasedb - PostInfo (table)
    const submit = async() =>{

        if(imageFile && userInput !== ''){
            setIsLoading(true);
            const {data, error} = await supabase.from('PostInfo').insert([
                {username: props.userName, post_detail: userInput, postImage: imageFile.split(',')[1],},
            ]);
            fetchData(); //to reload the updated data from db
            setIsLoading(false);
            if(error){
                setError(error.message);
            }else{
                setUserInput("");
                setImageFile(null);
                setShowImageInput(false);
            }
        }else if(userInput != ''){
            setIsLoading(true);
            const {data, error} = await supabase.from('PostInfo').insert([
                {username: props.userName, post_detail: userInput,},
            ]);
            fetchData(); //to reload the updated data from db
            setIsLoading(false);
            if(error){
                setError(error.message);
            }else{
                setUserInput("");
                setImageFile(null);
                setShowImageInput(false);
            }
        }
        
    };

    //fetching data from db - PostInfo (table)
    const fetchData = async() =>{
        setIsLoading(true);
        const{data, error} = await supabase.from('PostInfo').select('*').order("id",{ascending:false});
        setIsLoading(false);
        if(error) setError(error.message);
        else setUserData(data);
    }

    return(
    <div className="container">
        <div className="row">
            <div className="col1">
                <div className="post-box">
                    <textarea placeholder="What's on your mind?" value={userInput} onChange={handleTextInput}></textarea>
                    {showImageInput && <input type="file" accept="image/*" onChange={handleImageChange} />}
                    <button className="btn-img-upload" onClick={handleImageBtn}>Add Image</button>
                    <button className="btn-post" onClick={submit}>Post</button>
                </div>
                {/* updates the post by retrieving data from db */}
                <div className="posts">
                {isLoading ? (<div className='loading'>Loading...</div>):""}   
                <Post userData={userData}/>
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