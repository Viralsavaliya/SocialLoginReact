import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import moment from "moment";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
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
import {  useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  userName: yup
    .string("Enter Your Name")
    .min(2, "Min length")
    .max(50, "Max length")
    .required("Username is Required"),
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

function User() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [blog, setblog] = useState([]);
  const [category, setcategory] = useState([]);
  const [update, setupdate] = useState();
  const [totalrecord, settotalrecord] = useState("");
  const [open, setOpen] = useState(false);
  const [data, setdata] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [value, setValue] = useState(Date.now());
  const [con, setcon] = useState();
  const navigate = useNavigate();

  const { mutateAsync: cratestate } = useMutation(async (value) => {
    console.log("value");
    await axios
      .post(`http://localhost:3000/api/auth/register`, value)
      .then((res) => {
        if ({ res: true }) {
          console.log("blog create Successfully");
          enqueueSnackbar(
           res.data.message,
            { variant: "success" },
            { autoHideDuration: 1000 }
          );
          navigate('/signin')
        }
      })
      .catch((error) => {
        console.log(error)
        if (error) {
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
        console.log("dsdsdsds")
        await cratestate({
          userName: values.userName,
          email: values.email,
          password: values.password,
          date: value,
        });
    },
  });
  const { handleChange, handleSubmit, setFieldValue } = formik;

  const handleClickDelete = (data) => {
    setIsDeleteDialogOpen(true);
    setupdate(data._id);
  };

  const handleChangedrop = (data) => {
    console.log("datavalue", data);
    setdata(data);
  };

  return (
    <div>
      <div style={{ textAlign: "center", width: "100%" }}>
        <h1>Register</h1>
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
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email || blog.email }
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

                <Grid xs={6} mb={1} >
                  <LocalizationProvider  dateAdapter={AdapterDayjs}
                  > 
                    <DemoContainer  components={["DatePicker", "DatePicker"]}>
                      <DatePicker
                        label="Birth Date"
                        sx={{ width: "100%" }}
                        value={(moment(value , "date"))}
                        onChange={(newValue) => {setValue(newValue)}}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
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
        </div>
      </div>

      {/* <Table
        sx={{ minWidth: 650 }}
        style={{ border: "2px solid black" }}
        className="text-lg"
        aria-label="simple table"
      >
        <TableHead>
          <TableRow style={{ width: 100 }}>
            <TableCell
              style={{
                fontSize: 22,
                color: "rgb(38 28 26 / 87%)",
              }}
              align="left"
            >
              No.
            </TableCell>
            <TableCell
              style={{
                fontSize: 22,
                color: "rgb(38 28 26 / 87%)",
              }}
              align="left"
            >
              Image
            </TableCell>
            <TableCell
              style={{
                fontSize: 22,
                color: "rgb(38 28 26 / 87%)",
              }}
              align="left"
            >
              Title
            </TableCell>
            <TableCell
              style={{
                fontSize: 22,
                color: "rgb(38 28 26 / 87%)",
              }}
              align="left"
            >
              content
            </TableCell>
            <TableCell
              style={{
                fontSize: 22,
                color: "rgb(38 28 26 / 87%)",
              }}
              align="left"
            >
              Post_date
            </TableCell>
            <TableCell
              style={{
                fontSize: 22,
                color: "rgb(38 28 26 / 87%)",
              }}
              align="left"
            >
              Category
            </TableCell>
            <TableCell
              style={{
                fontSize: 22,
                color: "rgb(38 28 26 / 87%)",
              }}
              align="left"
            >
              Status
            </TableCell>
            <TableCell
              style={{
                fontSize: 22,
                color: "rgb(38 28 26 / 87%)",
              }}
              align="left"
            >
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {blog.map((row, i) => (
            <TableRow
              style={{ border: "2px solid black" }}
              key={row._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left" component="th" scope="row">
                {i + 1}
              </TableCell>
              <TableCell align="left">
                <img
                  src={"http://localhost:3000/uploads/blog/" + row.image}
                  height="70px"
                  alt=""
                  srcset=""
                />
              </TableCell>
              <TableCell align="left">{row.title}</TableCell>
              <TableCell align="left">
                {" "}
                <div dangerouslySetInnerHTML={{ __html: row.content }} />
              </TableCell>
              <TableCell align="left">{row.post_date}</TableCell>
              <TableCell align="left">
                {row.category_id?.categoryName}
              </TableCell>
              <TableCell align="left">
                {row.status === true ? "Active" : "Inactive"}
              </TableCell>
              <TableCell align="left" style={{ width: "230px" }}>
                <Button
                  style={{ margin: "0 0 0 0px", width: "80px" }}
                  color="primary"
                  variant="contained"
                  type="submit"
                  onClick={() => handleClick(row)}
                >
                  Update
                </Button>
                <Button
                  style={{ margin: "0 0 0 3px", width: "75px" }}
                  // startIcon={<DeleteIcon />}
                  color="secondary"
                  variant="contained"
                  type="submit"
                  onClick={() => handleClickDelete(row)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={totalrecord}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
      {/* <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setIsDeleteDialogOpen((row) => setupdate(row))}
          >
            Cancel
          </Button>
          {/* <Button onClick={() => handleDelete()} color="secondary">
            Delete
          </Button> }
        </DialogActions>
      </Dialog> */}
    </div>
  );
}

export default User;

