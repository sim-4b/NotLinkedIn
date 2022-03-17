import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Home() {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [currentCompanyName, setCurrentCompanyName] = useState(null);
  const [availableCompanies, setAvailableCompanies] = useState([]);
  const [otherCompanies, setOtherCompanies] = useState([]);

  useEffect(() => {
    const getCompanyName = localStorage.getItem('company_name');
    let dataOfAsscociatedCompany = JSON.parse(localStorage.getItem("company_details"));
    if (dataOfAsscociatedCompany) {
    setCurrentCompanyName(dataOfAsscociatedCompany.name)

    axios.post('http://localhost:3001/addCompany/companylistings', { companyName: getCompanyName }).then((res) => {
      let filteredArray = res.data.companyListings.filter((company) => company.name !== getCompanyName && company.name !== dataOfAsscociatedCompany.name);
      setAvailableCompanies(filteredArray);
    })

    axios.post('http://localhost:3001/addCompany/connectListings', { currentCompanyName: dataOfAsscociatedCompany.name }).then((res) => {
      setOtherCompanies(res.data.otherCompanies)
    })
    }

   

  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedCompany) {
      alert("Please select a valid Company Name")
    } else {
      axios.post('http://localhost:3001/addCompany/connectCompany', { currentCompanyName: currentCompanyName, futureCompanyName: selectedCompany }).then((res) => {
        alert(res.data.message)

      })
    }
  }

  const acceptCompany = (name) => {
    axios.post('http://localhost:3001/addCompany/handleCompanyRequest', { currentCompanyName: currentCompanyName, requestedName: name, status: true }).then((res) => {
        alert(res.data.message)
        window.location.href = "/home";

      })
  }

  const rejectCompany = (name) => {
    axios.post('http://localhost:3001/addCompany/handleCompanyRequest', { currentCompanyName: currentCompanyName, requestedName: name, status: false }).then((res) => {
      alert(res.data.message)
      window.location.href = "/";

    })
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
      <h1>Home Page</h1>
      <h4>Pending Requests: </h4>
      {
        otherCompanies.map((company) => {
          return (
            <div style={{display: 'flex'}}>
              <h3>{company}</h3>
              <button onClick={() => acceptCompany(company)}>
                Accept
              </button>
              <button onClick={() => rejectCompany(company)}>
                Reject
              </button>
            </div>
          )

        })

      }
      <br />
      <h4>Connect With A Company</h4>

      <form onSubmit={handleSubmit}>
        <select onChange={e => setSelectedCompany(e.target.value)}>
          <option value="">Select Company</option>
          {
            availableCompanies.map((company) => {
              return <option value={company.name}>{company.name}</option>
            })
          }
        </select>
        <input type="submit" value="Send Connection Request" />
      </form>

      <br />
      

    </div>

  )
}

export default Home