import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';


export const initializeLoginFramework = () => {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
}

export const handleGoogleSignIn = () =>{
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
    .then( res => {
      const {displayName, photoURL, email} = res.user;
      // after sign in user value
      const signedInUser={
        isSignedIn:true,
        name:displayName,
        email:email,
        photo:photoURL,
        success:true
      }
      // calling the use state function after sign in
      return signedInUser;
    })
    // error handling
    .catch(err=>{
      console.log(err);
      console.log(err.message);
    })
  }

export const handleSignOut = () => {
      return  firebase.auth().signOut()
        .then(res => {
        const signedOutUser ={
            isSignedIn:false,
            name:'',
            email:'',
            password:'',
            error:'',
            success:false,
            photo:''
        }
        return signedOutUser;
        })
        .catch(err=>{
        console.log(err)
        })
    }

export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(res =>{
        const newUserInfo= res.user;
        newUserInfo.error='';
        newUserInfo.success = true;
        updateUserName(name);
        return newUserInfo;
    })
    .catch(error=> {
        const newUserInfo={}
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        return newUserInfo;
    });
}

export const signInUserWithEmailAndPassword = (email, password) =>{
    return  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res=>{
        const newUserInfo = res.user;
        newUserInfo.error='';
        newUserInfo.success = true;
        return newUserInfo;
    })
    .catch(error => {
        const newUserInfo={}
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        return newUserInfo;
    });
}

const updateUserName = (name) => {
    const user = firebase.auth().currentUser;
  
      user.updateProfile({
        displayName: name
      })
      .then(function() {
        console.log('User name updated successfully')
      }).catch(function(error) {
        console.log(error)
      });
  }