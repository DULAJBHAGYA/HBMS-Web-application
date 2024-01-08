import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import NavBar from './NavBar';

export default function PostDetails() {
  const { id } = useParams();
  const [post,setPost]=useState([])

  useEffect(()=>{
    axios.get(`http://localhost:8000/post/${id}`).then((res)=>{
      setPost(res.data.post)
    })
  },[])
 
  console.log(post)

  return (
        <div className='container'> 
        <NavBar/>
          <div style={{ marginTop: '20px' }}>
            <h4>{post.topic}</h4>
            <hr />
  
            <dl className='row'>
              {/* <dt className='col-sm-3'>Topic</dt>
              <dd className='col-sm-9'>{topic}</dd> */}
  
              <dt className='col-sm-3'>Subject</dt>
              <dd className='col-sm-9'>{post.description}</dd>
  
              <dt className='col-sm-3'>Description</dt>
              <dd className='col-sm-9'>{post.postCategory}</dd>
            </dl>
          </div>
        </div>
  )

  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     post: {}
  //   };
  // }

  // componentDidMount() {
  //   const { match } = this.props;

  //   if (match && match.params) {
  //     const id = match.params.id;

  //     axios.get(`http://localhost:8000/post/${id}`).then((res) => {
  //       if (res.data.success) {
  //         this.setState({
  //           post: res.data.post
  //         });
  //         console.log(this.state.post);
  //       }
  //     });
  //   }
  // }

  // render() {
  //   const { topic, description, postCategory } = this.state.post;
    

  //   return (
  //     <div>
  //       <div style={{ marginTop: '20px' }}>
  //         <h4>{topic}</h4>
  //         <hr />

  //         <dl className='row'>
  //           {/* <dt className='col-sm-3'>Topic</dt>
  //           <dd className='col-sm-9'>{topic}</dd> */}

  //           <dt className='col-sm-3'>Subject</dt>
  //           <dd className='col-sm-9'>{description}</dd>

  //           <dt className='col-sm-3'>Description</dt>
  //           <dd className='col-sm-9'>{postCategory}</dd>
  //         </dl>
  //       </div>
  //     </div>
  //   );
  // }
}
