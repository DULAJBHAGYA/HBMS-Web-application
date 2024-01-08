import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../Styles/Crud2.css';
import NavBar from "./NavBar";
const Crud2 = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    retrievePosts();
  }, []);

  function retrievePosts() {
    axios.get("http://localhost:8000/posts2")
      .then(res => {
        setPosts(res.data);
        setIsLoading(false); // Set isLoading to false when data is fetched
      })
      .catch(error => {
        console.error("Error retrieving posts:", error);
        setIsLoading(false); // Set isLoading to false on error as well
      });
  }

  const onDelete = (id) => {
    axios.delete(`http://localhost:8000/post2/delete/${id}`)
      .then((res) => {
        alert("Delete Successful");
        retrievePosts();
      })
      .catch(error => {
        console.error("Error deleting post:", error);
      });
  }

  const filterData = (searchKey) => {
    const lowerCaseSearchKey = searchKey.toLowerCase();
    const filteredPosts = posts.filter((post) => {
      const lowerCaseRoute = post.route.toLowerCase();
      const lowerCaseBus = post.bus.toLowerCase();
      const lowerCaseStation = post.station.toLowerCase();
      const lowerCaseTime = post.time.toLowerCase();
      return (
        lowerCaseRoute.includes(lowerCaseSearchKey) ||
        lowerCaseBus.includes(lowerCaseSearchKey) ||
        lowerCaseStation.includes(lowerCaseSearchKey) ||
        lowerCaseTime.includes(lowerCaseSearchKey)
      );
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
  };

  return (
    <div className="container">
    <NavBar />
      <div className="row">
        <div className="col-lg-9 mt-2 mb-2">
          <h4>Live Location</h4>
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
            <th scope="col">#</th>
            <th scope="col">Route</th>
            <th scope="col">Bus</th>
            <th scope="col">Station</th>
            <th scope="col">Arrival Time</th>
            <th scope="col">Departure Time</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
        {posts && posts.map((post, index) => (
  <tr key={index}>
    <th scope="row">{index + 1}</th>
    <td>
      <a href={`/post/${post._id}`} style={{ textDecoration: "none" }}>{post.route}</a>
    </td>
    <td>{post.bus}</td>
    <td>{post.station}</td>
    <td>{post.arr_time}</td>
    <td>{post.dep_time}</td>
    <td>
      <a className="btn btn-primary" href={`posts2/edit/${post._id}`}>
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
        <a href="/addlocation" style={{ textDecoration: 'none', color: "white" }}>
          Add new live location</a></button>
      

    </div>
  );
}

export default Crud2;