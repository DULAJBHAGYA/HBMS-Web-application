import React, { useState, useEffect } from "react";
import axios from 'axios';
import NavBar from "../NavBar";

// import { post } from "../../../routes/posts";

const Conductors = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  

  
  useEffect(() => {
    retrievePosts();
  }, []);

  

  function retrievePosts() {
    axios.get("http://localhost:8000/conductors")
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
    axios.delete(`http://localhost:8000/conductor/delete/${id}`)
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
      const lowerCaseNICno = post.nic_no.toLowerCase();
      const lowerCaseName = post.name.toLowerCase();
      const lowerCasePostMobileno = post.mobile_no.toLowerCase();
      const lowerCasePostLicenseno = post.license_no.toLowerCase();

      return lowerCaseNICno.includes(lowerCaseSearchKey) ||
      lowerCaseName.includes(lowerCaseSearchKey) ||
      lowerCasePostMobileno.includes(lowerCaseSearchKey) ||
      lowerCasePostLicenseno.includes(lowerCaseSearchKey) 
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
          <h4 style={{fontWeight:'600'}}>Registered Conductors</h4>
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
            <th scope="col">Reg. No</th>
            <th scope="col">Name</th>
            <th scope="col">Mobile No.</th>
            <th scope="col">License No.</th>
            <th scope="col">NIC No</th>
            <th scope="col" >Action</th>
          </tr>
        </thead>
        <tbody>
        {posts && posts.map((post, index) => (
    <tr key={index}>
      <th scope="row">{`c${(index + 1).toString().padStart(4, '0')}`}</th>
      {/* Rest of your table row code */}
              <td>{post.name}</td>
              <td>{post.mobile_no}</td>
              <td>{post.license_no}</td>
              <td>{post.nic_no}</td>
              <td>
                <a className="btn btn-primary" href="#" onClick={() => onDelete(post._id)}>
                  <i className="fas fa-trash-alt"></i>&nbsp;Delete
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}


export default Conductors;
