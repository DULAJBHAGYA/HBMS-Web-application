import React, { Component } from 'react';
import axios from 'axios';
import NavBar from './NavBar';

export default class PostDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post: {}
    };
  }

  componentDidMount() {
    const { match } = this.props;

    if (match && match.params) {
      const id = match.params.id;

      axios.get(`http://localhost:8000/post2/${id}`).then((res) => {
        if (res.data.success) {
          this.setState({
            post: res.data.post
          });
          console.log(this.state.post);
        }
      });
    }
  }

  render() {
    const { route, bus, station, time } = this.state.post;

    return (
      <div className='container'>
      <NavBar/>
        <div style={{ marginTop: '20px' }}>
          <h4>{route}</h4>
          <hr />

          <dl className='row'>
            <dt className='col-sm-3'>Route</dt>
            <dd className='col-sm-9'>{route}</dd>

            <dt className='col-sm-3'>Bus</dt>
            <dd className='col-sm-9'>{bus}</dd>

            <dt className='col-sm-3'>Station</dt>
            <dd className='col-sm-9'>{station}</dd>

            <dt className='col-sm-3'>Time</dt>
            <dd className='col-sm-9'>{time}</dd>
          </dl>
        </div>
      </div>
    );
  }
}
