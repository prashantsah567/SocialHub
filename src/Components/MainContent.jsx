import React, {useState, useEffect} from "react";
import { createClient } from "@supabase/supabase-js";
import './MainContent.css';
import Post from './Post';

const MainContent = () =>{

    //establishing the connection with supabase
    const supabaseUrl = 'https://iqpfwknfalacvxyumiba.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxcGZ3a25mYWxhY3Z4eXVtaWJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE1Nzk3NDcsImV4cCI6MTk5NzE1NTc0N30.LNGADTjW_IP91_BFO6CLiXFqjgpI2wAS4hYDTSP5Xt0';
    const supabase = createClient(supabaseUrl, supabaseKey);

    //state variables
    const [userInput, setUserInput] = useState('');
    const [userData, setUserData] = useState([]);
    const [imageFile, setImageFile] = useState(null);

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
    //inserting the user data into supabasedb - PostInfo (table)
    const submit = async() =>{

        const {data, error} = await supabase.from('PostInfo').insert([
            {username: 'Test-User', post_detail: userInput, postImage: imageFile.split(',')[1],}
        ])
        if(error){
            console.log(error);
        }
        else {
            alert('Image uploaded successfully:'); 
        }
    }

    //fetching data from db - PostInfo (table)
    useEffect(() =>{
        async function fetchData(){
            const{data, error} = await supabase.from('PostInfo').select('*').order("id",{ascending:false});
            if(error) console.log('Error fetching data:', error);
            else setUserData(data);
        }
        fetchData()
    },[userData])

    return(
        <div className="container">
            <div className="row">
                <div className="col1">
                    <div className="post-box">
                        <textarea placeholder="What's on your mind?" value={userInput} onChange={handleTextInput}></textarea>
                        Image: <input type="file" accept="image/*" onChange={handleImageChange} />
                        <button className="btn-img-upload">Add Image</button>
                        <button className="btn-post" onClick={submit}>Post</button>
                    </div>
                    {/* updates the post by retrieving data from db */}
                    <div className="posts">
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