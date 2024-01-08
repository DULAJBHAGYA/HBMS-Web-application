import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import NavBar from './NavBar';

export default function BusDetails() {
  const { id } = useParams();
  const [post,setPost]=useState([])

  useEffect(()=>{
    axios.get(`http://localhost:8000/bus/${id}`).then((res)=>{
      setPost(res.data.post)
    })
  },[])
 
  console.log(post)

  return (
        <div className='container'>
        <NavBar/>
          <div style={{ marginTop: '20px' }}>
            <h4>{post.bus_no}</h4>
            <hr />
  
            <dl className='row'>
              {/* <dt className='col-sm-3'>Topic</dt>
              <dd className='col-sm-9'>{topic}</dd> */}
  
              <dt className='col-sm-3'>Owner</dt>
              <dd className='col-sm-9'>{post.name}</dd>
  
              <dt className='col-sm-3'>Chassis number</dt>
              <dd className='col-sm-9'>{post.chassis_no}</dd>

              <dt className='col-sm-3'>Route</dt>
              <dd className='col-sm-9'>{post.route}</dd>

              <dt className='col-sm-3'>Permit number</dt>
              <dd className='col-sm-9'>{post.permit_no}</dd>
            </dl>
          </div>
        </div>
  )
}