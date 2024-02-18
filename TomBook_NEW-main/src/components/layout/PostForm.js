import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import '../../Styles.css';
import '../../scripts/profile.js';

const PostForm = () => {
    //const SERVER_ROOT_URL = "https://tombook.azurewebsites.net/"
    const SERVER_ROOT_URL = sessionStorage.getItem("API_SERVER_URI");
    console.log(SERVER_ROOT_URL);
    const { id } = useParams();
    console.log("ID", id);
    const [profileId, setProfileId] = useState("");
    const [title, setTitle] = useState("");
    const [comments, setComments] = useState("");

    const titleHandler = (event) => {
        console.log("titleHandler");
        setTitle(event.target.value)
    }
    const commentsHandler = (event) => {
        setComments(event.target.value)
    }

    useEffect(() => {
        const profileId = sessionStorage.getItem("currentUser");
        setProfileId(profileId);
        console.log("profileId", profileId)
        if (id !== undefined) {
            loadData();
        }
    }, [id]);

    const loadData = async () => {

        const resp = await fetch(SERVER_ROOT_URL + "/post/" + id);
        const data = await resp.json();
        console.log("loadData:", data);
        setComments(data.comments);
        setTitle(data.title);
        console.log("Load Data=comments", data.comments);
    }
    const submitData = async () => {
        const data = {
            profileId: profileId,
            title: title,
            comments: comments,
        }
        const method=id===undefined?"POST":"PUT";
        const url = SERVER_ROOT_URL + "/post"+(id===undefined?"":"/"+id);
        console.log("DATA", data);
        console.log("URL:", url);
        const resp = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const json = await resp.json();
        console.log(json);
        alert(json.message);
    }
    const deletePost=async ()=>{
        const resp = await fetch(SERVER_ROOT_URL + "/post/"+id, {
            method:"DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const json = await resp.json();
        console.log(json);
        alert(json.message);
    }
    return (
        <div className='backgroundImage'>
        <div className="formbox">
            <form>
                <h1 className="homeh1">Post </h1>

                <div className="input">
                    <div className="inputfield">
                        <input type="text" placeholder="Title" id="title" value={title} onChange={titleHandler} />
                    </div>
                    <div>
                        <textarea onChange={commentsHandler} value={comments}>{comments}</textarea>
                    </div>
                    <div className="subbutton">
                        <input type="button" value="Submit" onClick={submitData} />
                    </div>
                    <div className="subbutton">
                        <input type="button" value="Delete" onClick={deletePost} />
                    </div>
                </div>
            </form>

            </div>
        </div>
    )
}

export default PostForm