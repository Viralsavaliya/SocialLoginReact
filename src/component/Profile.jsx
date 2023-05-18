
import FormControlLabel from '@mui/material/FormControlLabel';

import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Radio,
  RadioGroup,

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
import { convertLength } from '@mui/material/styles/cssUtils';

const validationSchema = yup.object({
  userName: yup
    .string("Enter Your Name")
    .min(2, "Min length")
    .max(50, "Max length"),
  password: yup
    .string("Enter Your password")
    .min(2, "Min length")
    .max(50, "Max length")
});

function Profile() {
  const [page, setPage] = useState(0);
  const [blog, setblog] = useState([]);
  const [data, setdata] = useState("");
  const [user, setuser] = useState("");
  const [update, setupdate] = useState();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(Date.now());
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState('');
  const [image, setimage] = useState("");
  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = ` ${token}`;




  const handleClickOpen = () => {
    setOpen(true);
    setFieldValue("userName", user.userName);
    setFieldValue("age", user.age);
    setFieldValue("mobileNo", user.mobileNo);
    setSelectedValue(user.gender);
  };
  const handleClose = () => {
    setOpen(false);
    setupdate();
  };

  const uploadfile = (e) => {
    let file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    axios
      .post(`http://localhost:3000/api/upload-image`, formData)
      .then((res) => {
        setimage(res.data.data);
        // return setvalue(res.data);
      });
  };



  const getusers = () => {
    axios.get('http://localhost:3000/api/profile')
      .then((res) => {
        setuser(res.data.data);
      })

  };

  useEffect(() => {
    getusers();
  }, []);





  const { mutateAsync: updatestate } = useMutation(async (value) => {

    await axios
      .put(`http://localhost:3000/api/update-profile`, value)
      .then((res) => {
        if ({ res: true }) {
          enqueueSnackbar(
            "update user Successfully",
            { variant: "success" },
            { autoHideDuration: 1000 }
          );
          handleClose();
          setupdate();
          getusers();

        }
      })
      .catch((error) => {
        if (error.response.status === 422) {
          console.log("axios error");
          enqueueSnackbar(
            "This state already added",
            { variant: "error" },
            { autoHideDuration: 1000 }
          );
        }
      });
  });


  const formik = useFormik({
    initialValues: {
      image: "",
      userName: "",
      age: "",
      mobileNo: "",
      gender: ""
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await updatestate({
        image: image,
        userName: values.userName,
        age: values.age,
        mobileNo: values.mobileNo,
        gender: selectedValue
      });
    },
  });
  const { handleChange, handleSubmit, setFieldValue } = formik;




  return (
    <div>
      <div style={{ textAlign: "center", width: "100%" }}>
        <div>Image:               
          <img
          src={"http://localhost:3000/" + user.image}
          height="70px"
          alt=""
          srcset=""
        /></div>
        <div>UserName:{user.userName}</div>
        <div>Email:{user.email}</div>
        <div>Gender:{user.gender}</div>
        <div>MobileNo:{user.mobileNo}</div>
        <div>Age:{user.age}</div>
        <h1>Profile</h1>
        <div>
          <div>
            <Button
              style={{
                backgroundColor: "#1876d2",
                color: "#fdfdfe",
                // margin: "5px 0 5px 80%",
              }}
              variant="outlined"
              onClick={handleClickOpen}
            >
              Update Profile
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">Update Profile</DialogTitle>
              <DialogContent>
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
                          id="image"
                          name="image"
                          type="File"
                          accept="*/image"
                          onChange={(e) => uploadfile(e)}
                          error={
                            formik.touched.image && Boolean(formik.errors.image)
                          }
                          helperText={formik.touched.image && formik.errors.image}
                        />
                      </Grid>

                      <Grid xs={6} mb={1}>
                        <TextField
                          fullWidth
                          id="userName"
                          name="userName"
                          label="UserName"
                          value={formik.values.userName || blog.userName}
                          onChange={handleChange}
                          error={
                            formik.touched.userName && Boolean(formik.errors.userName)
                          }
                          helperText={
                            formik.touched.userName && formik.errors.userName
                          }
                        />
                      </Grid>
                      <Grid xs={6} mb={1}>
                        <TextField
                          fullWidth
                          id="age"
                          name="age"
                          label="Age"
                          value={formik.values.age || blog.age}
                          onChange={handleChange}
                          error={formik.touched.age && Boolean(formik.errors.age)}
                          helperText={formik.touched.age && formik.errors.age}
                        />
                      </Grid>
                      <Grid xs={6} mb={1} >
                        <TextField
                          fullWidth
                          id="mobileNo"
                          name="mobileNo"
                          label="MobileNo"
                          value={formik.values.mobileNo || blog.mobileNo}
                          onChange={handleChange}
                          error={
                            formik.touched.mobileNo && Boolean(formik.errors.mobileNo)
                          }
                          helperText={
                            formik.touched.mobileNo && formik.errors.mobileNo
                          }
                        />
                      </Grid>
                      <Grid xs={6}>
                        Gender :
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          value={selectedValue}
                          onChange={(event) => {
                            setSelectedValue(event.target.value);
                          }}
                          name="radio-buttons-group"
                        >
                          <FormControlLabel value="female" control={<Radio />} label="Female" />
                          <FormControlLabel value="male" control={<Radio />} label="Male" />
                          <FormControlLabel value="other" control={<Radio />} label="Other" />
                        </RadioGroup>
                      </Grid>


                      <Grid xs={6}>
                        <Button
                          type="submit"
                          color="primary"
                          variant="contained"
                          fullWidth
                        >
                          Register
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Typography>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>


    </div>
  );
}

export default Profile;

