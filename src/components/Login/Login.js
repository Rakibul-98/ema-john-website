import React, { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { createUserWithEmailAndPassword, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInUserWithEmailAndPassword } from './LoginManager';





function Login() {
  const [newUser,setNewUser] = useState(false);
  const [user,setUser] = useState({
    // before sing in user value
    isSignedIn : false,
    name:'',
    email:'',
    password:'',
    photo:''
  });

  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation()
  let { from } = location.state || { from: { pathname: "/" } };

// sign in button handling
const googleSignIn = () => {
    handleGoogleSignIn()
    .then(res => {
        handleResponse(res, true)
    })
}

// sign out button handling
const signOut = () => {
    handleSignOut()
    .then(res => {
        handleResponse(res, false);
    })
}

const handleResponse = (res, redirect) =>{
    setUser(res);
    setLoggedInUser(res);
    if (redirect) {
        history.replace(from);
    }
}

// event handler target value and name capture
const handleBlur = (e) =>{
  let isFieldValid = true;
  // email validation
  if (e.target.name === 'email') {
    isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
  }
  // pass validation
  if (e.target.name === 'password') {
    const isPassValid = e.target.value.length > 6
    const passHasNumber = /\d{1}/.test(e.target.value);
    isFieldValid = isPassValid && passHasNumber;
  }
  // form validation if email and pass is valid
  if (isFieldValid) {
    const newUserInfo = {...user}
    newUserInfo[e.target.name] = e.target.value;
    setUser(newUserInfo);
  }
}

const handleSubmit = (e) => {
    // create account
  if (newUser && user.email && user.password) {
    createUserWithEmailAndPassword(user.name, user.email, user.password)
    .then(res => {
        handleResponse(res, true)
    })
  }

//   sign in 
  if (!newUser && user.email && user.password) {
    signInUserWithEmailAndPassword(user.email, user.password)
    .then(res => {
        handleResponse(res, true)
    })
  }
  e.preventDefault();
}

  return (
    <div style={{textAlign: 'center'}}>
      <header className="App-header">
        <br/>
      {
        user.isSignedIn ?<button onClick={signOut}>Sign out</button> :
        <button className="btn btn-primary" onClick={googleSignIn}>Sign in with Google</button>
      }
        {
          user.isSignedIn && 
          <div>
            <p>Welcome, {user.name} ! </p>
            <p>Your email address is : {user.email} </p>
            <img src={user.photo} alt=""/>
          </div>
        }
        <h1>Our own authentication system</h1>
        <p>
        <input type="checkbox" onChange={() => setNewUser(!newUser)} name="new-user" id=""/> 
        <label htmlFor="new-user">New user Sign up</label>
        </p>
        <form onSubmit={handleSubmit}>
          { newUser &&
            <p>User Name : <input name="name" onBlur={handleBlur} type="text" placeholder="Your Name" /></p>
            }
          <p>Your email : <input type="text" onBlur={handleBlur} name="email" placeholder="Your email address" required/> </p>
          <p>Password : <input type="password" onBlur={handleBlur} name="password" placeholder="Your Password" required /> </p>
          <input className="btn btn-success" type="submit" value={newUser ? 'Sign Up' : 'Sign In' } />
        </form>
        <p style={{color:'red'}}>{user.error} </p>
        {
          user.success && <p style={{color:'green'}}>Congratulation! Account {newUser ? 'created' : 'logged in'} successfully... </p>
        }
      </header>
    </div>
  );
}

export default Login;