import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom'
import '../../Styles.css';
import '../../scripts/profile.js';

const Login = () => {
    //const SERVER_ROOT_URL = "https://tombook.azurewebsites.net/"
    const SERVER_ROOT_URL = localStorage.getItem("API_SERVER_ROOT");
    console.log(SERVER_ROOT_URL);
    const { id } = useParams();
    console.log("ID", id);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const emailHandler = (event) => {
        console.log("emailHandler", event.target.value);
        setEmail(event.target.value);
    }
    const passwordHandler = (event) => {
        console.log("passwordHandler", event.target.value);
        setPassword(event.target.value);
    }
    const login = async () => {
        const data = {
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
        }
        console.log("USER", data);
        const resp = await fetch(SERVER_ROOT_URL + "/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const json = await resp.json();
        console.log(json);
        if (json.status === 1) {
            sessionStorage.setItem("currentUser", JSON.stringify(json.user));
            window.location.replace("/landing");
        }
        console.log(json);
        alert(json.message);
    }
    const setLogin = () => {
        console.log("setLogin", id);
        sessionStorage.setItem("currentUser", id);
    }
    return (
        <div className="formbox">
            <form>
                <h1 className="home">Login </h1>

                <div className="input">

                    <div className="inputfield">
                        <input type="email" placeholder="Email Address" id="email" value={email} onChange={emailHandler} />
                    </div>
                    <div className="inputfield">
                        <input type="password" placeholder="Password" id="password" value={password} onChange={passwordHandler} />
                    </div>
                    <div className="subbutton">
                        <input type="button" value="Login" onClick={login} />
                    </div>

                </div>
            </form>



        </div>
    )
}

export default Login