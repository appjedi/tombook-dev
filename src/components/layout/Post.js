import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import '../../Styles.css';


const Post = () => {
    //const SERVER_ROOT_URL = "https://tombook.azurewebsites.net/"
    const SERVER_ROOT_URL = localStorage.getItem("AWS_SERVER_ROOT");
    console.log(SERVER_ROOT_URL);
    const { id } = useParams();
    console.log("ID", id);
    const [profileId, setProfileId] = useState("");
    const [title, setTitle] = useState("");
    const [comments, setComments] = useState("");


    useEffect(() => {
        const profileId = sessionStorage.getItem("currentUser");
        setProfileId(profileId);
        console.log("profileId", profileId)
        if (id !== undefined) {
            loadData();
        }
    }, [id]);

    const loadData = async () => {
        console.log("loadData for post ", id);
        const resp = await fetch(SERVER_ROOT_URL + "/post/" + id);
        const data = await resp.json();
        console.log("Load Data", data);
        setTitle(data.title);
        setComments(data.comments);
    }

    return (
        <div className="formbox">

            <div>
                <p>Title: {title}</p>
            </div>
            <div>
                <p>Comments:</p>
                {comments}
            </div>
        </div>




    )
}

export default Post