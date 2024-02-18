import React, { useState, useEffect } from 'react';
import '../../Styles.css';


const Posts = () => {
    //const SERVER_ROOT_URL = "https://tombook.azurewebsites.net/"
    const SERVER_ROOT_URL = sessionStorage.getItem("API_SERVER_URI");
    console.log(SERVER_ROOT_URL);
    const [ready, setReady] = useState(false);
    const [data, setData] = useState([]);
    const [list, setList] = useState("");
    useEffect(() => {
        loadData();
    }, []);
    const loadData = async () => {

        console.log("DATA", data);
        const resp = await fetch(SERVER_ROOT_URL + "/posts");
        const json = await resp.json();
        console.log(json);
        setData(json);
        const list = json.map((item) =>
            <li key={item._id}>
                {item.title} - <a href={'/viewPost/' + item._id}>View</a> - <a href={'/post/' + item._id}>Edit</a>
            </li>
        )
        setList(list);
        setReady(true);
    }
    return (
        <div className='backgroundImage'>
            <br/>
            {ready ? list : <div />}


        </div>
    )
}

export default Posts