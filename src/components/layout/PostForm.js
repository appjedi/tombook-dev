import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import '../../Styles.css';
import '../../scripts/profile.js';

const PostForm = () => {
    //const SERVER_ROOT_URL = "https://tombook.azurewebsites.net/"
    const SERVER_ROOT_URL = localStorage.getItem("AWS_SERVER_ROOT");
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

        const resp = await fetch(SERVER_ROOT_URL + "/posts/" + id);
        const data = await resp.json();
        console.log("Load Data", data);
    }
    const submitData = async () => {
        const data = {
            profileId: profileId,
            title: title,
            comments: comments,
        }
        console.log("DATA", data);
        const resp = await fetch(SERVER_ROOT_URL + "/post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const json = await resp.json();
        console.log(json);
        alert(json.message);
    }

    return (
        <div className="formbox">
            <form>
                <h1 className="homeh1">Post </h1>

                <div className="input">
                    <div className="inputfield">
                        <input type="text" placeholder="Title" id="title" value={title} onChange={titleHandler} />
                    </div>
                    <div>
                        <textarea onChange={commentsHandler}>{comments}</textarea>
                    </div>
                    <div className="subbutton">
                        <input type="button" value="Submit" onClick={submitData} />
                    </div>

                </div>
            </form>



        </div>
    )
}

export default PostForm