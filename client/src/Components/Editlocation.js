import React, { Component } from 'react';
import axios from 'axios';
import NavBar from './NavBar';

export default class Editlocation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      route:'',
      bus:'',
      station:'',
      time:''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleInputChange(event) {
    const { route, value } = event.target;

    this.setState({
      [route]: value
    });
  }

  onSubmit(event) {
    event.preventDefault();
    const { match } = this.props;

    if (match && match.params) {
      const id = match.params.id;
      const { route, bus, station, time} = this.state;

      const data = {
        route:route,
        bus:bus,
        station:station,
        time:time

      };

      axios
        .put(`http://localhost:8000/post2/update/${id}`, data)
        .then((res) => {
          if (res.data.success) {
            this.setState({
              route:'',
              bus:'',
              station:'',
              time:''
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  componentDidMount() {
    const { match } = this.props;

    if (match && match.params) {
      const id = match.params.id;

      axios.get(`http://localhost:8000/post2/${id}`).then((res) => {
        if (res.data.success) {
          alert('Post retrieved successfully');
          const { route, bus, station, time } = res.data.post;
          this.setState({
            route:route,
            bus:bus,
            station:station,
            time:time
          });
        }
      });
    }
  }

  render() {
    return (
      <div className='container'>
        <NavBar/>
      <div className="col-md-8 mt-4 mx-auto">
        <h1 className="h3 mb-3 font-weight-normal">Edit location</h1>
        <form className="needs-validation" noValidate>
          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label style={{ marginBottom: '5px' }}>Route</label>
            <input
              type="text"
              className="form-control"
              name="route"
              placeholder="Edit route"
              value={this.state.route}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label style={{ marginBottom: '5px' }}>Bus</label>
            <input
              type="text"
              className="form-control"
              name="bus"
              placeholder="Edit bus"
              value={this.state.bus}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label style={{ marginBottom: '5px' }}>Station</label>
            <input
              type="text"
              className="form-control"
              name="station"
              placeholder="Edit station"
              value={this.state.station}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label style={{ marginBottom: '5px' }}>Time</label>
            <input
              type="text"
              className="form-control"
              name="time"
              placeholder="Edit time"
              value={this.state.time}
              onChange={this.handleInputChange}
            />
          </div>

          
          <button
            className="btn btn-primary"
            type="submit"
            style={{ marginTop: '15px' }}
            onClick={this.onSubmit}
          >
            <i className="far fa-check-square"></i>
            &nbsp; Update
          </button>
        </form>
      </div>
      </div>

    );
  }
}
