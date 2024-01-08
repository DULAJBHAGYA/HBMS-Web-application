import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../Styles/Crud.css';
import NavBar from "./NavBar";

// import { post } from "../../../routes/posts";

const Crud = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    retrievePosts();
  }, []);

  function retrievePosts() {
    axios.get("http://localhost:8000/posts")
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
    axios.delete(`http://localhost:8000/post/delete/${id}`)
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
      const lowerCaseTopic = post.topic.toLowerCase();
      const lowerCaseDescription = post.description.toLowerCase();
      const lowerCasePostCategory = post.postCategory.toLowerCase();
      return lowerCaseTopic.includes(lowerCaseSearchKey) ||
             lowerCaseDescription.includes(lowerCaseSearchKey) ||
             lowerCasePostCategory.includes(lowerCaseSearchKey);
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
          <NavBar />
      <div className="row">
        <div className="col-lg-9 mt-2 mb-2">
          <h4>Main news feed</h4>
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
            <th scope="col">Subject</th>
            <th scope="col">Topic</th>
            <th scope="col">Description</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {posts && posts.map((post, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>
                <a href={`/post/${post._id}`} style={{ textDecoration: "none" }}>{post.topic}</a>
              </td>
              <td>{post.description}</td>
              <td>{post.postCategory}</td>
              <td>
                <a className="btn btn-primary" href={`/edit/${post._id}`}>
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
        <a href="/add" style={{ textDecoration: 'none', color: "white" }}>
          Create New Main News</a></button>
      

    </div>
  );
}

export default Crud;
