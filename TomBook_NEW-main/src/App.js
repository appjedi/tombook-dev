import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes, Switch, Link, Navigate } from "react-router-dom";
import Landing from "./components/layout/Landing";
import NavBar from "./components/layout/NavBar";
import Profile from "./components/layout/Profile";
import Profiles from "./components/layout/Profiles";
import PostForm from "./components/layout/PostForm";
import Posts from "./components/layout/Posts";
import Post from "./components/layout/Post";
import Login from "./components/layout/Login";
import headerlogo from './components/layout/logo1.jpg';
import './App.css';


function App() {
  //sessionStorage.setItem("API_SERVER_URI", "http://tomsbook.net:8080");
  sessionStorage.setItem("API_SERVER_URI", "http://localhost:8080");
  return (
    <div className="App">
      <h1>TomBook</h1>
      <img src={headerlogo} className='mainlogo' alt='main logo' width={100} height={100} />


      <Router>
        <NavBar />
        <Routes>
          <Route path="landing" element={<Landing />} />
          <Route path="profile" element={<Profile />} >
            <Route path=":id" element={<Profile />} />
          </Route>
          <Route path="profiles" element={<Profiles />} />
          <Route path="post" element={<PostForm />} >
            <Route path=":id" element={<PostForm />} />
          </Route>
          <Route path="viewPost/:id" element={<Post />} />

          <Route path="posts" element={<Posts />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
