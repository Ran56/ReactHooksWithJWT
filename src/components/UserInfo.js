import React from "react";
import jwt from 'jwt-decode';
import Auth from "../services/Auth";


const UserInfo = () => {
  const currentUser = Auth.getCurrentUser();
  
  const userinfo = jwt(currentUser.token)
  return (
    
    <div className="container">
      {
        console.log('this is userinfo   ', userinfo)
      }
      <h1>User Information</h1>
      <header className="jumbotron">
      <div id='wrap'>
        <h3>
          Username: {userinfo.sub}
        </h3>
        <br></br>
        <h3>
        AllowedCreateResources: {userinfo.allowedCreateResources}
        </h3> 
        <br></br>
        <h3>
        AllowedDeleteResources: {userinfo.allowedDeleteResources}
        </h3>
        <br></br>
        <h3>
        AllowedReadResources: {userinfo.allowedReadResources}
        </h3>
        <br></br>
        <h3>
        AllowedUpdateResources: {userinfo.allowedUpdateResources}
        </h3>
        <br></br> 
        <h3 >Token: {currentUser.token}</h3>

        </div>
        
      </header>
    </div>
  );
};

export default UserInfo;