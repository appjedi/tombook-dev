import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import '../../Styles.css';
import '../../scripts/profile.js';

const Profile = () => {
    //const SERVER_ROOT_URL = "https://tombook.azurewebsites.net/"
    const SERVER_ROOT_URL = sessionStorage.getItem("API_SERVER_URI");
    console.log(SERVER_ROOT_URL);
    const { id } = useParams();
    console.log("ID", id);
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [location, setLocation] = useState("");
    const [interest, setInterest] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const lastNameHandler = (event) => {
        console.log("ID", id);
        setLastName(event.target.value)
    }
    const firstNameHandler = (event) => {
        setFirstName(event.target.value)
    }
    const locationHandler = (event) => {
        setLocation(event.target.value)
    }
    const interestHandler = (event) => {
        setInterest(event.target.value)
    }
    const emailHandler = (event) => {
        setEmail(event.target.value)
    }
    const passwordHandler = (event) => {
        setPassword(event.target.value)
    }
    useEffect(() => {
        if (id !== undefined) {
            loadData(id);
        } else {
            const currentUser = sessionStorage.getItem("currentUser");
            if (currentUser !== null && currentUser !== undefined) {
                const user = JSON.parse(currentUser);
                console.log("CURRENT USER:", user)
                loadData(user.id);
            }
        }
    }, []);

    const loadData = async (id) => {

        const resp = await fetch(SERVER_ROOT_URL + "/profile/" + id);
        const data = await resp.json();
        console.log("Load Data", data);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setLocation(data.location);
        setEmail(data.email);
        setInterest(data.interests);
        setPassword(data.password);
    }
    const submitData = async () => {
        const data = {
            lastName: document.getElementById("lastName").value,
            firstName: document.getElementById("firstName").value,
            location: document.getElementById("location").value,
            interests:document.getElementById("interest").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
        }
        const method=id === undefined?"POST":"PUT";
        const url = SERVER_ROOT_URL + "/profile"+(id===undefined?"":"/"+id);
        console.log("URL:", url);
        console.log("DATA", data);
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
    const deleteUser=async()=>{
        const url = SERVER_ROOT_URL + "/profile/"+id;
        console.log("URL:", url);
        
        const resp = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const json = await resp.json();
        console.log(json);
        alert(json.message);
    }
    const setLogin = () => {
        console.log("setLogin", id);
        sessionStorage.setItem("currentUser", id);
    }
    return (
        <div className='backgroundImage'>
        <div className="formProfile">
            <form>
                <h1 className="home">Profile </h1>

                <div className="input">
                    <div className="inputfield">
                        <input type="text" placeholder="First Name" id="firstName" value={firstName} onChange={firstNameHandler} />
                    </div>
                    <div className="inputfield">
                        <input type="text" placeholder="Last Name" id="lastName" value={lastName} onChange={lastNameHandler} />
                    </div>
                    <div className="inputfield">
                        <input type="text" placeholder="Location" id="location" value={location} onChange={locationHandler} />
                    </div>
                    <div className="inputfield">
                        <input type="text" placeholder="Interests" id="interest" value={interest} onChange={interestHandler} />
                    </div>
                    <div className="inputfield">
                        <input type="email" placeholder="Email Address" id="email" value={email} onChange={emailHandler} />
                    </div>
                    <div className="inputfield">
                        <input type="text" placeholder="Password" id="password" value={password} onChange={passwordHandler} />
                    </div>
                    <div className="subbutton">
                        <input type="button" value="Submit" onClick={submitData} />
                    </div>
                    <div className="subbutton">
                        <input type="button" value="Set User" onClick={setLogin} />
                    </div>
                    <div className="subbutton">
                        <input type="button" value="Delete" onClick={deleteUser} />
                    </div>
                </div>
            </form>

        </div>

        </div>
    )
}

export default Profile