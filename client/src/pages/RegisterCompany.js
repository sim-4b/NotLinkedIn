import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { Link } from 'react-router-dom';


function RegisterCompany() {

  let [userData, setUserData] = useState(null);
  let [companyDetails, setCompanyDetails] = useState(null);
  const [availableUsers, setAvailableUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [companyUsers, setCompanyUsers] = useState([]);


  useEffect(() => {
    let dataOfLoggedUser = JSON.parse(localStorage.getItem("user_data"));
    if (dataOfLoggedUser) {  
      setUserData(dataOfLoggedUser);
    }
    let dataOfAsscociatedCompany = JSON.parse(localStorage.getItem("company_details"));
    if (dataOfAsscociatedCompany) {
        setCompanyDetails(dataOfAsscociatedCompany);
    }

    axios.post('http://localhost:3001/auth/fetchUsers', {}).then((res) => {
      let filteredUsers = res.data.userList.filter((user) => user.status == null);
      setAvailableUsers(filteredUsers);
    })

    // axios.post('http://localhost:3001/auth/companyUsers', { companyId: dataOfAsscociatedCompany?.id  } ).then((res) => {
    //   let companyUsers = res.data.companyUsersList;
    //   setCompanyUsers(companyUsers);
    //   //setAvailableUsers(filteredUsers);
    // })

    

  }, []);


  const initialValues = {
    name: "",
    description: "",
    email: ""
  };

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/addCompany", {...data, email: userData.email, status: userData.status}).then((response) => {
      localStorage.setItem("company_name", response.data.name);
    });
    alert('Company Created Succesfully!');
  };

  const addUsers = (e) => {
    axios.post("http://localhost:3001/auth/addToCompany", {email: selectedUser, companyId: companyDetails.id}).then((response) => {
      
    });
  }

  const retrieveUsers = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/auth/companyUsers", { companyId: companyDetails.id }).then((response) => {
      console.log(response.data.companyUsersList);
      setCompanyUsers(response.data.companyUsersList);
    });
  }

  return (
    <div className="w-50 p-3">
      <Link to="/home" className='btn btn-primary'>Home</Link> &nbsp;  
      <Link to="/registerCompany" className='btn btn-primary'> Register Company</Link> &nbsp; 
      <Link to="/userDirectory" className='btn btn-primary'>User Directory</Link> &nbsp; 
      <Link to="/logout" className='btn btn-primary' onClick={ () => {
        localStorage.clear();
        window.location.href = "/login";
      } }> Logout</Link> &nbsp; 
      { 
      
        userData ?

        (!companyDetails ?

        <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        <div className="form-group">
          <Form className="formContainer">
            <h4>Create Company</h4>
            <label>Name: </label><br />
            <ErrorMessage name="name" component="span" />
            <Field
              id="companySignup"
              name="name"
              placeholder="Enter Company Name"
              className="form-control"
            />

            <label>Description: </label><br />
            <ErrorMessage name="description" component="span" />
            <Field
              id="companySignup"
              name="description"
              placeholder="Enter Description"
              className="form-control"
            />

            <br />
            <button type="submit" className="btn btn-primary">Create</button>
          </Form>
        </div>
      </Formik>

        :<div>
          <h3>Company Details</h3>
           <h4> Company Name: {companyDetails.name} </h4>
           <h4> Company Description: {companyDetails.description} </h4>
           <h2> Add Users to company</h2>

           { <form onSubmit={addUsers}>
              <select onChange={e => setSelectedUser(e.target.value)}>
              <option value="">Select User</option>
          {
            availableUsers.map((user) => {
              return <option value={user.email}>{user.email}</option>
            })
          }
        </select>
        <input type="submit" value="Add to Company" />
        </form> }
        
        <h3> Company Users: </h3>


        { <form onSubmit={retrieveUsers}>
        <input type="submit" value="View Users:" />
        </form> }

        {
            companyUsers.map((user) => {
              return <span>Name: {user.name}  | Email: {user.email}<br /></span>
            })
          }

        </div>):
        <div>

            <h1>Please Login First and then come here...</h1>

        </div>

      }
     

    </div>
  )
}

export default RegisterCompany