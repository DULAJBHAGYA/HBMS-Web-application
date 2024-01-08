import React, { useState, useEffect } from "react";
import axios from 'axios';
import NavBar from "./NavBar";

// import { post } from "../../../routes/posts";

const RegBuses = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  

  
  useEffect(() => {
    retrievePosts();
  }, []);

  

  function retrievePosts() {
    axios.get("http://localhost:8000/buses")
      .then(res => {
        console.log(res.data)
        setPosts(res.data);
        setIsLoading(false); // Set isLoading to false when data is fetched
      })
      .catch(error => {
        console.error("Error retrieving posts:", error);
        setIsLoading(false); // Set isLoading to false on error as well
      });
  }
  

  const onDelete = (id) => {
    axios.delete(`http://localhost:8000/bus/delete/${id}`)
      .then((res) => {
        alert("Delete Successfully");
        retrievePosts();
      })
      .catch(error => {
        console.error("Error deleting post:", error);
      });
  }

  const filterData = (searchKey) => {
    const lowerCaseSearchKey = searchKey.toLowerCase();
    const filteredPosts = posts.filter((post) => {
      const lowerCaseBusno = post.bus_no.toLowerCase();
      const lowerCaseName = post.name.toLowerCase();
      const lowerCasePostChassisno = post.chassis_no.toLowerCase();
      const lowerCasePostRoute = post.route.toLowerCase();
      const lowerCasePostPermino = post.permit_no.toLowerCase();

      return lowerCaseBusno.includes(lowerCaseSearchKey) ||
      lowerCaseName.includes(lowerCaseSearchKey) ||
      lowerCasePostChassisno.includes(lowerCaseSearchKey) ||
      lowerCasePostRoute.includes(lowerCaseSearchKey) ||
      lowerCasePostPermino.includes(lowerCaseSearchKey);

    });
    setPosts(filteredPosts);
  };

  

  const handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;
    if (searchKey.trim() !== "") {
      filterData(searchKey);
    } else {
      retrievePosts();
    }
  }
  return (
    <div className="container">
    <NavBar/>
      <div className="row">
        <div className="col-lg-9 mt-2 mb-2">
          <h4 style={{fontWeight:'600'}}>Registered Buses</h4>
        </div>
        <div className="col-lg-3 mt-2 mb-2">
          <input
            className="form-control"
            type="search"
            placeholder="Search"
            name="searchQuery"
            onChange={handleSearchArea}
          />
        </div>
      </div>
      <table className="table table-hover" style={{ marginTop: '40px' }}>
        <thead>
          <tr>
            <th scope="col">Reg.No</th>
            <th scope="col">Bus Number</th>
            <th scope="col">Owner</th>
            <th scope="col">Route</th>
            <th scope="col">Chassis Number</th>
            <th scope="col">Permit number</th>
            <th scope="col" >Action</th>
          </tr>
        </thead>
        <tbody>
          {posts && posts.map((post, index) => (
            <tr key={index}>
            <th scope="row">{`b${(index + 1).toString().padStart(4, '0')}`}</th>
              <td>
                <a href={`bus/${post._id}`} style={{ textDecoration: "none" }}>{post.bus_no}</a>
              </td>
              <td>{post.name}</td>
              <td>{post.route}</td>
              <td>{post.chassis_no}</td>
              <td>{post.permit_no}</td>
              <td>
                <a className="btn btn-primary" href={`bus/edit/${post._id}`}>
                  <i className="fas fa-edit"></i>&nbsp;Edit
                </a>
                &nbsp;
                <a className="btn btn-primary" href="#" onClick={() => onDelete(post._id)}>
                  <i className="fas fa-trash-alt"></i>&nbsp;Delete
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-info">
        <a href="/addbus" style={{ textDecoration: 'none', color: "white" }}>
          Add bus</a></button>
      

    </div>
  );
}

export default RegBuses;

