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
import './App.css';

function App() {
  return (
    localStorage.setItem("AWS_SERVER_ROOT", "appjedinode3.azurewebsites.net/posts");

  <div className="App">
    <h1>TomBook</h1>
    <Router>
      <NavBar />
      <Routes>
        <Route path="landing" element={<Landing />} />
        <Route path="profile" element={<Profile />} >
          <Route path=":id" element={<Profile />} />
        </Route>
        <Route path="profiles" element={<Profiles />} />
        <Route path="post" element={<PostForm />} />
        <Route path="viewPost/:id" element={<Post />} />

        <Route path="posts" element={<Posts />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </Router>
  </div>
  );
}

export default App;
