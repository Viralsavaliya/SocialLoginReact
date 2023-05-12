import React, { useEffect, useState } from 'react';
import { LoginSocialGoogle } from 'reactjs-social-login'
import { GoogleLoginButton } from 'react-social-login-buttons'
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useFormik } from 'formik';
import { getAuth, signInWithPopup, FacebookAuthProvider } from "firebase/auth";
// import GoogleLogin from 'react-google-login';
import {auth} from './config';


const responseGoogle = (response) => {
  console.log(response);
  // Send the response to the server to verify and create a user account
};

const Google = () => {
  const [value,setvalue] = useState();
  const navigate = useNavigate();
  // console.log(value,"value")
  

  
 

  // const handleSubmit = async (values) => {
  //   try {
  //     const response = await axios.post('http://localhost:3000/api/auth/login', values);
  //     console.log(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };


  // const formik = useFormik({
  //   initialValues: {
  //   },
  //   onSubmit: handleSubmit
  // })


    const handleclick = async() => {

    const provider = new FacebookAuthProvider();
      signInWithPopup(auth,provider).then((data)=>{
          // console.log(data);
          const userdata={
            userEmail:data.user.email,
            googleId:data.user.uid,
            name:data.user.displayName
          }
          setvalue(data.user)
        axios.post('http://localhost:3000/api/auth/login', userdata)
        .then((res)=>{
          console.log(res)
          if(res){
            enqueueSnackbar(
              res.data.message,
              { variant: "success" },
              { autoHideDuration: 1000 }
            );
            }
            })
            .catch((error) => {
              console.log(error)
              if (error.response.status === 400) {
                console.log("axios error");
                enqueueSnackbar(
                  error.response.data.message,
                  { variant: "error" },
                  { autoHideDuration: 1000 }
                );
              }
            });
         
        
      })
    }


  return (
    <div>

    <button onClick={handleclick} >Sign in with Google</button>




    </div>
  );
};



export default Google;


// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDlBAN3FK-QnWtJFGgdk9wsCrGQrJIFyNM",
//   authDomain: "facebook-32794.firebaseapp.com",
//   projectId: "facebook-32794",
//   storageBucket: "facebook-32794.appspot.com",
//   messagingSenderId: "614332208711",
//   appId: "1:614332208711:web:98d7e37351cafdcb9e8362",
//   measurementId: "G-W2Q6V8NF2K"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);