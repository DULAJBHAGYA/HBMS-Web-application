import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import axios from 'axios';

const UserLocation = () => {
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    retrievePosts();
  }, []);

  function retrievePosts() {
    axios.get("http://localhost:5000/locations")
      .then(res => {
        setLocations(res.data);
        setIsLoading(false); // Set isLoading to false when data is fetched
      })
      .catch(error => {
        console.error("Error retrieving posts:", error);
        setIsLoading(false); // Set isLoading to false on error as well
      });
  }

  return (
    <div className='container'>
      <NavBar />
      <div className='heading' style={{ fontSize: '40px', fontWeight: 'bold', color: '#0A244B' }}>
        User updates
      </div>
      <div className='locdropdown'>
        <h2 style={{ color: '#0A244B' }}>Select Route</h2>
        <select>
          <option value=''></option>
          <option value='route1'>Route 1</option>
          <option value='route2'>Route 2</option>
          <option value='route3'>Route 3</option>
          {/* Add more options as needed */}
        </select>
      </div>

      <div className='locdropdown'>
        <h2 style={{ color: '#0A244B' }}>Select Bus</h2>
        <select>
          <option value=''></option>
          <option value='route1'>Bus 1</option>
          <option value='route2'>Bus 2</option>
          <option value='route3'>Bus 3</option>
          {/* Add more options as needed */}
        </select>
      </div>

      <table className="table table-hover" style={{ marginTop: '40px' }}>
  <thead>
    <tr>
      <th scope="col">User Reg.No</th>
      <th scope="col">Route</th>
      <th scope="col">Route No.</th>
      <th scope="col">Station</th>
      <th scope="col">Arrival Time</th>
      <th scope="col">Departure Time</th>
    </tr>
  </thead>
  <tbody>
    {locations && locations.map((post, index) => (
      <tr key={index}>
        <th scope="row">{index + 1}</th>
        <td>
          <a href={`/post/${post._id}`} style={{ textDecoration: "none" }}>{post.route}</a>
        </td>
        <td>{post.route_no}</td>
        <td>{post.station}</td>
        <td>{post.arr_time}</td>
        <td>{post.dep_time}</td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
};

export default UserLocation;
