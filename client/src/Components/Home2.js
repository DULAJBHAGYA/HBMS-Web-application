import React,{useState, useEffect} from 'react';
import Navbar from './NavBar';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import axios from 'axios';
import ClockImg from '../../src/Images/clock.jpg';


const Home2 = () => {
  const [passengers, setPassengers] = useState([]);
  const [conductors, setConductors] = useState([]);
  const [buses, setBuses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    retrievePassengers();
    retrieveConductors();
    retrieveBuses();
  }, []);

  function retrievePassengers() {
    axios.get("http://localhost:8000/passengers")
      .then(res => {
        console.log(res.data);
        setPassengers(res.data);
        setIsLoading(false); // Set isLoading to false when data is fetched
      })
      .catch(error => {
        console.error("Error retrieving passengers:", error);
        setIsLoading(false); // Set isLoading to false on error as well
      });
  }

  function retrieveConductors() {
    axios.get("http://localhost:8000/conductors")
      .then(res => {
        console.log(res.data);
        setConductors(res.data);
        setIsLoading(false); // Set isLoading to false when data is fetched
      })
      .catch(error => {
        console.error("Error retrieving conductors:", error);
        setIsLoading(false); // Set isLoading to false on error as well
      });
  }

  function retrieveBuses() {
    axios.get("http://localhost:8000/buses")
      .then(res => {
        console.log(res.data);
        setBuses(res.data);
        setIsLoading(false); // Set isLoading to false when data is fetched
      })
      .catch(error => {
        console.error("Error retrieving buses:", error);
        setIsLoading(false); // Set isLoading to false on error as well
      });
  }

  return (
    <div className='container'>
    <Navbar/>
      <div>
      <h1 style={{color:'#0A244B', fontWeight:'600'}}>Dashboard</h1>

      <div className='containe-fluid'>

        <div className='row g-3 my-2'>

          <div className='col-md-3'>
            <div className='p-3 b shadow-sm d-flex justify-content-around align-items-center border border-primary rounded shadow-lg p-3 mb-5  rounded'
            style={{backgroundColor:'white'}}>
              <div>
                <h3 style={{color:'#0d6efd'}}>{passengers.length}</h3>
                <p className='fs-9' style={{color:'#0d6efd'}}>Total <br/> registered passengers</p>
              </div>
              <i class="fa fa-users fs-3 primary-text   secomdary-bg p-3" style={{color:'#0d6efd'}} ></i>
            </div>
          </div>

          <div className='col-md-3'>
            <div className='p-3 bg-white shadow-sm d-flex justify-content-around align-items-center border border-primary rounded shadow-lg p-3 mb-5 bg-white rounded'>
              <div>
                <h3 style={{color:'#0d6efd'}}>{conductors.length}</h3>
                <p className='fs-9' style={{color:'#0d6efd'}}>Total <br/> registered conductors</p>
              </div>
              <i class="fa fa-user-tie fs-3 primary-text   secomdary-bg p-3" style={{color:'#0d6efd'}}></i>
            </div>
          </div>

          <div className='col-md-3'>
            <div className='p-3 bg-white shadow-sm d-flex justify-content-around align-items-center border border-primary rounded shadow-lg p-3 mb-5 bg-white rounded'>
              <div>
                <h3 style={{color:'#0d6efd'}}>{buses.length}</h3>
                <p className='fs-9' style={{color:'#0d6efd'}}>Total <br/> registered buses</p>
              </div>
              <i class="fa fa-bus fs-3 primary-text   secomdary-bg p-3" style={{color:'#0d6efd'}}></i>
            </div>
          </div>

          <div className='col-md-3'>
            <div className='p-3 bg-white shadow-sm d-flex justify-content-around align-items-center border border-primary   rounded shadow-lg p-3 mb-5 bg-white rounded'>
              <div>
                <h3 style={{color:'#0d6efd'}}>523</h3>
                <p className='fs-9' style={{color:'#0d6efd'}}>Total <br/> app downloads</p>
              </div>
              <i class="fa fa-download fs-3 primary-text   secomdary-bg p-3" style={{color:'#0d6efd'}}></i>
            </div>
          </div>


        </div>

          <div className='row'>
          
            <div className='col-md-3 border border-primary rounded shadow-lg'>
            <img src={ClockImg} style={{width:'300px', borderRadius:'20px', marginTop:'25px', marginLeft:'2px'}} />
            </div>


<div className='col-md'>
<h1 style={{color:'#0A244B', fontSize:'30'}}>Leader board</h1>
            <table class="table">
  <thead class="thead-light">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Contact No.</th>
      <th scope="col">Points</th>
    </tr>
  </thead>
  <tbody>
  <tr>
      <th scope="row">1</th>
      <td>Dulaj Bhagya</td>
      <td>0768323678</td>
      <td>190</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Darshana Wijebahu</td>
      <td>0757889878</td>
      <td>135</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Hasini Chakreshwari</td>
      <td>0768898578</td>
      <td>120</td>
    </tr>
    <tr>
      <th scope="row">4</th>
      <td>Kaveesha Dharmawickrama</td>
      <td>0761234987</td>
      <td>111</td>
    </tr>
    <tr>
      <th scope="row">5</th>
      <td>Tharushi Nissanka</td>
      <td>0714568765</td>
      <td>98</td>
    </tr>
    
  </tbody>
</table>       
</div>
            <div className='col-md-3 border border-info rounded shadow-sm shadow-lg'>
            <div className="calendar ">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar />
            </LocalizationProvider>
          </div>
            </div>
          </div>
        </div>

      </div>

      </div>
  )
}

export default Home2;

