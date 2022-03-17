import React, {useEffect} from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Yup from "yup";
import axios from "axios";
import { Link } from 'react-router-dom';

function Signup() {

    useEffect(() => {
      localStorage.clear();
    } , []);

    const initialValues = {
        name: "",
        email: "",
        password: "",
      };
    
      const validationSchema = Yup.object().shape({
        name: Yup.string().min(3).max(15).required(),
        email: Yup.string().min(3).max(30).required(),
        password: Yup.string().min(4).max(20).required(),
      });
    
      const onSubmit = (data) => {
        axios.post("http://localhost:3001/auth", data).then(() => {
          alert('Signed up succesfully!');
          window.location.href="/login";
        });
      };
    



    return (
    <div className="w-25 p-3">
      
      <Link to="/login" className='btn btn-primary'> Login</Link> &nbsp; 
      <Link to="/signup" className='btn btn-primary'> Signup</Link>   &nbsp; 
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
          <div className="form-group">
        <Form className="formContainer">
          <label>Name: </label><br />
          <ErrorMessage name="name" component="span" />
          <Field
            id="signup"
            name="name"
            placeholder="Enter Name"
            className="form-control"
          />

          <label>Email: </label><br />
          <ErrorMessage name="email" component="span" />
          <Field
            id="signup"
            name="email"
            placeholder="Enter Email"
            className="form-control"
          />

          <label>Password: </label><br />
          <ErrorMessage name="password" component="span" className="text-danger" />
          <Field
            type="password"
            id="signup"
            name="password"
            placeholder="Enter Password"
            className="form-control"
          />
            <br />
          <button type="submit" className="btn btn-primary"> Register</button>
        </Form>
        </div>
      </Formik>
    </div>
      )
}

export default Signup