import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';


export default class CreatePost extends Component {
  constructor(props) {
    super(props);
//  412
    this.state = {
      topic: '',
      description: '',
      postCategory: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleInputChange(event) {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  }

  onSubmit(event) {
    event.preventDefault();
    const { topic, description, postCategory } = this.state;

    const data = {
      topic: topic,
      description: description,
      postCategory: postCategory
    };

    axios.post('http://localhost:8000/post/save', data)
      .then((res) => {
        if (res.data.success) {
          this.setState({
            topic: '',
            description: '',
            postCategory: ''
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className='container'>
        <NavBar/>
      <div className='col-md-8 mt-4 mx-auto'>
        <h1 className='h3 mb-3 font-weight-normal'>Update Main News Feed</h1>
        <form className='needs-validation' noValidate>
          <div className='form-group' style={{ marginBottom: '15px' }}>
            <label style={{ marginBottom: '5px' }}>Subject</label>
            <input
              type='text'
              className='form-control'
              name='topic'
              placeholder='Enter subject'
              value={this.state.topic}
              onChange={this.handleInputChange}
            />
          </div>

          <div className='form-group' style={{ marginBottom: '15px' }}>
            <label style={{ marginBottom: '5px' }}>Title</label>
            <input
              type='text'
              className='form-control'
              name='description'
              placeholder='Enter title'
              value={this.state.description}
              onChange={this.handleInputChange}
            />
          </div>

          <div className='form-group' style={{ marginBottom: '15px' }}>
            <label style={{ marginBottom: '5px' }}>Description</label>
            <textarea
              className='form-control'
              name='postCategory'
              placeholder='Enter description'
              value={this.state.postContent}
              onChange={this.handleInputChange}
              style={{ resize: 'vertical' }}
            ></textarea>
          </div>
          <Link to='/news-feed'>
          <button
            className='btn btn-primary'
            type='submit'
            style={{ marginTop: '15px' }}
            onClick={this.onSubmit}
          >
            <i className='far fa-check-square'></i>
            &nbsp; Save
          </button>
          </Link>
        </form>
      </div>
      </div>
    );
  }
}
