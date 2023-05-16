import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LoginSocialFacebook } from 'reactjs-social-login'
import {FacebookLoginButton} from 'react-social-login-buttons'
import moment from "moment";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import GithubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';

import {
  Box,
  Button,
  Grid,
  SvgIcon,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import * as yup from "yup";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import {auth} from './config';
import { signInWithPopup ,GoogleAuthProvider , FacebookAuthProvider , GithubAuthProvider , TwitterAuthProvider} from "firebase/auth";
  

const validationSchema = yup.object({
    email: yup
    .string("Enter Your email")
    .email("Email is Required")   
    .required("Email is Required"),
    password: yup
    .string("Enter Your password")
    .min(2, "Min length")
    .max(50, "Max length")
    .required("password is Required"),
});

function Login() {

  const [blog, setblog] = useState([]);

  const [value, setValue] = useState(Date.now());
  const navigate = useNavigate();

  const { mutateAsync: cratestate } = useMutation(async (value) => {
    console.log("value",value);
    await axios
      .post(`http://localhost:3000/api/auth/login`, value)
      .then((res) => {
        // console.log(res,"res")
        if ( res) {
          console.log("login Successfully");
          enqueueSnackbar(
            res.data.message,
            { variant: "success" },
            { autoHideDuration: 1000 }
          );
          navigate('/dashborad')
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          console.log("axios error");
          enqueueSnackbar(
            error.response.data.message,
            { variant: "error" },
            { autoHideDuration: 1000 }
          );
        }
      });
  });

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      date: Date.now(),
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
        await cratestate({
          userName: values.userName,
          email: values.email,
          password: values.password,
          date: value,
        });
     
    },
  });
  const { handleChange, handleSubmit } = formik;

  const handleclick = async() => {
    const provider = new GoogleAuthProvider(); 
    signInWithPopup(auth,provider).then((data)=>{
        const userdata={
          userEmail:data.user.email,
          googleId:data.user.uid,
          name:data.user.displayName
        }
        // setvalue(data.user)
      axios.post('http://localhost:3000/api/auth/login', userdata)
      .then((res)=>{
        console.log(res)
        if(res){
          navigate('/dashborad')
          enqueueSnackbar(
            res.data.message,
            { variant: "success" },
            { autoHideDuration: 1000 }
          );
          }
          })
          .catch((error) => {
            if (error.response.status === 400) {
              enqueueSnackbar(
                error.response.data.message,
                { variant: "error" },
                { autoHideDuration: 1000 }
              );
            }
          });
    })
  }
  const handleclickfacebook = async() => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth,provider).then((data)=>{
        const userdata={
          userEmail:data.user.email,
          facebookId:data.user.uid,
          name:data.user.displayName
        }
        // setvalue(data.user)
      axios.post('http://localhost:3000/api/auth/login', userdata)
      .then((res)=>{
        console.log(res)
        if(res){
          navigate('/dashborad')
          enqueueSnackbar(
            res.data.message,
            { variant: "success" },
            { autoHideDuration: 1000 }
          );
          }
          })
          .catch((error) => {
            if (error.response.status === 400) {
              enqueueSnackbar(
                error.response.data.message,
                { variant: "error" },
                { autoHideDuration: 1000 }
              );
            }
          });
    })
  }

  const handleclickgithub = async() => {
    console.log("github");
    const provider = new GithubAuthProvider();
    console.log("github11");
    
    signInWithPopup(auth,provider).then((data)=>{
      console.log(data);
        const userdata={
          userEmail:data.user.email,
          githubId:data.user.uid,
          name:data.user.displayName
        }
        // setvalue(data.user)
      axios.post('http://localhost:3000/api/auth/login', userdata)
      .then((res)=>{
        console.log(res)
        if(res){
          navigate('/dashborad')
          enqueueSnackbar(
            res.data.message,
            { variant: "success" },
            { autoHideDuration: 1000 }
          );
          }
          })
          .catch((error) => {
            if (error.response.status === 400) {
              enqueueSnackbar(
                error.response.data.message,
                { variant: "error" },
                { autoHideDuration: 1000 }
              );
            }
          });
    })
  }

  const handleclicktwitter = async() => {
    const provider = new TwitterAuthProvider();
    signInWithPopup(auth,provider).then((data)=>{
      console.log(data);
        const userdata={
          userEmail:data.user.email,
          twitterId:data.user.uid,
          name:data.user.displayName
        }
        // setvalue(data.user)
      axios.post('http://localhost:3000/api/auth/login', userdata)
      .then((res)=>{
        console.log(res)
        if(res){
          navigate('/dashborad')
          enqueueSnackbar(
            res.data.message,
            { variant: "success" },
            { autoHideDuration: 1000 }
          );
          }
          })
          .catch((error) => {
            if (error.response.status === 400) {
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
      <div style={{ textAlign: "center", width: "100%" }}>
        <h1>Login</h1>
        <div>
          <Typography sx={{ p: 2 }}>
            <form onSubmit={handleSubmit}>
              <Grid
                container
                columns={11}
                spacing={0}
                alignItems="center"
                justifyContent="center"
              >
                <Grid xs={6} mb={1}>
                  <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email || blog.email}
                    onChange={handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>
                <Grid xs={6} mb={1}>
                  <TextField
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    value={formik.values.password || blog.password}
                    onChange={handleChange}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                  />
                </Grid>

                <Grid xs={6}>
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    fullWidth
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>
            </form>
            <Grid xs={6}>
            <Button style={{border:"1px solid black", padding:"0 8px", margin:"5px 5px"}} onClick={handleclick} ><GoogleIcon /><p style={{paddingLeft:9}}> Sign in with Google</p></Button>
           <Button style={{border:"1px solid black", padding:"0 8px", margin:"5px 5px"}} onClick={handleclickfacebook} ><FacebookIcon /><p style={{paddingLeft:9}}> Sign in with Facebook</p></Button>
            </Grid>
            <Grid xs={6}>
            <Button style={{border:"1px solid black", padding:"0 8px", margin:"5px 5px"}} onClick={handleclickgithub} ><GithubIcon /><p style={{paddingLeft:9}}> Sign in with Github</p></Button>
            <Button style={{border:"1px solid black", padding:"0 8px", margin:"5px 5px"}} onClick={handleclicktwitter} ><TwitterIcon /><p style={{paddingLeft:9}}> Sign in with Twitter</p></Button>
            </Grid>
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default Login