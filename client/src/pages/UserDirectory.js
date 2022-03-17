import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';

function UserDirectory() {

    const [usersList, setUsersList] = useState([]);
    const [searchString, setSearchString] = useState([]);

    useEffect(() => { 
        axios.post('http://localhost:3001/auth/fetchUsers', {}).then((response) => {
            let allUsers = response.data.userList;
            setUsersList(allUsers);
          })
     }, []);

     const searchUsers = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/auth/searchUsers", {email: searchString}).then((response) => {
            let allUsers = response.data.userList;
            setUsersList(allUsers);
    });
      }

    return (
        <div>
            <Link to="/home" className='btn btn-primary'>Home</Link> &nbsp;  
            <Link to="/registerCompany" className='btn btn-primary'> Register Company</Link> &nbsp; 
            <Link to="/userDirectory" className='btn btn-primary'>User Directory</Link> &nbsp; 
            <Link to="/logout" className='btn btn-primary' onClick={ () => {
                localStorage.clear();
                window.location.href = "/login";
            } }> Logout</Link> &nbsp; 
            <h2>Search for Users:</h2>
            <form  onSubmit={searchUsers}>
                <label> Search: </label>
                <input type = "text" placeholder="search by email" onChange={e => setSearchString(e.target.value)}></input>
                <input type="submit" value="Submit" />
            </form>
            {
            usersList.map((user) => {
                return <span>Name: {user.name}  | Email: {user.email}<br /></span>
            })
          }
        </div>
    )
}

export default UserDirectory