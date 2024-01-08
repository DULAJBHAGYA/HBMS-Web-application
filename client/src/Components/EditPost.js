import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import NavBar from './NavBar';
import { Link } from 'react-router-dom';

export default function EditPost() {
  const { id } = useParams();
  const [posts,SetPosts]=useState({});
  const [post,SetPost]=useState({});
  useEffect(()=>{
    axios.get(`http://localhost:8000/post/${id}`).then((res)=>{
      SetPosts(res.data)
      SetPost(res.data.post)
    })
  },[])

  const handleUpdate=(data)=>{
    axios.put(`http://localhost:8000/post/update/${id}`,data).then((res)=>{
      console.log(res.data)
    })
  }


  console.log(post.description)

  return (
    <div className='container'><NavBar/>
        <div className="col-md-8 mt-4 mx-auto">
          <h1 className="h3 mb-3 font-weight-normal">Edit Main News Feed</h1>
          <form className="needs-validation" noValidate>
            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label style={{ marginBottom: '5px' }}>Subject</label>
              <input
                type="text"
                className="form-control"
                name="topic"
                placeholder="Edit subject"
                onChange={(event)=>{
                  SetPost({...post,topic:event.target.value})
                }}
                value={post.topic}
              />
            </div>
  
            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label style={{ marginBottom: '5px' }}>Title</label>
              <input
                type="text"
                className="form-control"
                name="description"
                placeholder="Edit title"
                onChange={(event)=>{
                  SetPost({...post,description:event.target.value})
                }}
                value={post.description}
                
              />
            </div>
  
            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label style={{ marginBottom: '5px' }}>Description</label>
              <textarea
                className="form-control"
                name="postCategory"
                placeholder="Edit description"
                
                style={{ resize: 'vertical' }}
                onChange={(event)=>{
                  SetPost({...post,postCategory:event.target.value})
                }}
                value={post.postCategory}
              ></textarea>
            </div>
              <Link to='/news-feed'>
            <button
              className="btn btn-primary"
              type="button"
              style={{ marginTop: '15px' }}
              onClick={handleUpdate(post)}
            >
              <i className="far fa-check-square"></i>
              &nbsp; Update
            </button>
            </Link>
          </form>
        </div>
        </div>
      );
  
}
