import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import NavBar from './NavBar';

export default function EditBus() {
  const { id } = useParams();
  const [posts,SetPosts]=useState({});
  const [post,SetPost]=useState({});
  useEffect(()=>{
    axios.get(`http://localhost:8000/bus/${id}`).then((res)=>{
      SetPosts(res.data)
      SetPost(res.data.post)
    })
  },[])

  const handleUpdate=(data)=>{
    axios.put(`http://localhost:8000/bus/update/${id}`,data).then((res)=>{
      console.log(res.data)
    })
  }


  console.log(post.description)

  return (
    <div className='container'>
        <NavBar />
      
        <div className="col-md-8 mt-4 mx-auto">
          <h1 className="h3 mb-3 font-weight-normal">Edit Bus Details</h1>
          <form className="needs-validation" noValidate>
            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label style={{ marginBottom: '5px' }}>Bus number</label>
              <input
                type="text"
                className="form-control"
                name="bus_no"
                placeholder="Edit bus number"
                onChange={(event)=>{
                  SetPost({...post,bus_no:event.target.value})
                }}
                value={post.bus_no}
              />
            </div>
  
            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label style={{ marginBottom: '5px' }}>Owner</label>
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Edit name"
                onChange={(event)=>{
                  SetPost({...post,name:event.target.value})
                }}
                value={post.name}
                
              />
            </div>
  
            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label style={{ marginBottom: '5px' }}>Owner</label>
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Edit name"
                onChange={(event)=>{
                  SetPost({...post,name:event.target.value})
                }}
                value={post.name}
                
              />
            </div>

            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label style={{ marginBottom: '5px' }}>Chassis number</label>
              <input
                type="text"
                className="form-control"
                name="chassis_no"
                placeholder="Edit chassis number"
                onChange={(event)=>{
                  SetPost({...post,chassis_no:event.target.value})
                }}
                value={post.chassis_no}
                
              />
            </div>

            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label style={{ marginBottom: '5px' }}>Route</label>
              <input
                type="text"
                className="form-control"
                name="route"
                placeholder="Edit route"
                onChange={(event)=>{
                  SetPost({...post,route:event.target.value})
                }}
                value={post.route}
                
              />
            </div>

            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label style={{ marginBottom: '5px' }}>Permit number</label>
              <input
                type="text"
                className="form-control"
                name="permit_no"
                placeholder="Edit permit number"
                onChange={(event)=>{
                  SetPost({...post,permit_no:event.target.value})
                }}
                value={post.permit_no}
                
              />
            </div>
            <Link to='/regbus'>
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
