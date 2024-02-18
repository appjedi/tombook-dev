import React, { Fragment, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import personWithPhone from '../../images/persononphone.png';
import backGround2 from '../../images/background2.jpg';
import '../../Styles.css';

const Landing = ({ isAuthenticated }) => {

  const [user, setUser] = useState({})
  console.log("landing");
  const currentUser = sessionStorage.getItem("currentUser");
  console.log("user:", currentUser);

  useEffect(() => {
    //nst currentUser = sessionStorage.getItem("currentUser");
    console.log("user:", currentUser);
    if (currentUser !== undefined || currentUser !== null) {
        setUser(JSON.parse(currentUser));
    }else{
      
    }
  }, []);
  
  if (currentUser === undefined || currentUser === null) {
    return <Navigate to="/login" />;
  }

  return (
    <Fragment>
      <header className="App-header">
        <div className="welcomeBox">
          <h1>
            Welcome to Tom'sBook
          </h1>
        </div>
        <div className="discription">
          This website for all of Tom's Friends to connect with each other.
        </div>
        <div>
          <img src={personWithPhone} className='persononphone' alt='person with phone' />
          <img src={backGround2} className='Landingbackground' alt='landing background' />
        </div>
      </header>
    </Fragment>
  );
};


export default Landing;

