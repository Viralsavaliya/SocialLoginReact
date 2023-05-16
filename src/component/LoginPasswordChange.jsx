
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

function LoginpasswordChange() {

  const [blog, setblog] = useState([]);

  const [value, setValue] = useState(Date.now());
  const navigate = useNavigate();

  const { mutateAsync: cratestate } = useMutation(async (value) => {
    console.log("value",value);
    await axios
      .put(`http://localhost:3000/api/auth/password`, value)
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
     email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
        await cratestate({
          email: values.email,
          password: values.password,
        });
     
    },
  });
  const { handleChange, handleSubmit } = formik;








  return (
    <div>
      <div style={{ textAlign: "center", width: "100%" }}>
        <h1>Social login </h1>
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
                    Add Password
                  </Button>
                </Grid>
              </Grid>
            </form>
           
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default LoginpasswordChange