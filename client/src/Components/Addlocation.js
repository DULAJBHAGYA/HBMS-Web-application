import React, { Component } from 'react';
import axios from 'axios';
import NavBar from './NavBar';

export default class Addlocation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      route: '',
      bus:'',
      station:'',
      time: '',
      routes: [] // Store the fetched routes here
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    // Fetch the route data from your server API endpoint
    axios
      .get('http://localhost:8000/routes') // Replace with your server endpoint
      .then((response) => {
        this.setState({ routes: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleInputChange(event) {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  }

  onSubmit(event) {
    event.preventDefault();
    const { route, bus, station, arr_time, dep_time } = this.state;
  
    const data = {
      route: route,
      bus: bus,
      station: station,
      arr_time: arr_time,
      dep_time: dep_time
    };
  
    axios
      .post('http://localhost:8000/post/create', data)
      .then((res) => {
        if (res.data.success) {
          this.setState({
            route: '',
            bus: '',
            station: '',
            arr_time: '',
            dep_time: ''
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  

  render() {
    const { routes, route, station } = this.state;

    // Find the selected route object
    const selectedRoute = routes.find((r) => r.route === route);

    // Extract the bus stops from the selected route object
    const busStops = selectedRoute ? Object.values(selectedRoute).slice(3, 9) : [];

    return (
      <div className='container'>
        <NavBar />
        <div className='col-md-8 mt-4 mx-auto'>
          <h1 className='h3 mb-3 font-weight-normal'>Add location</h1>
          <form className='needs-validation' noValidate>
            <div className='form-group' style={{ marginBottom: '15px' }}>
              <label style={{ marginBottom: '5px' }}>Select route</label>
              <select
                className='form-control'
                name='route'
                value={this.state.route}
                onChange={this.handleInputChange}
              >
                <option value=''></option>
                {this.state.routes.map((route) => (
                  <option key={route._id} value={route.route}>
                    {route.route}
                  </option>
                ))}
              </select>
            </div>

            <div className='form-group' style={{ marginBottom: '15px' }}>
              <label style={{ marginBottom: '5px' }}>Select bus</label>
              <select
                className='form-control'
                name='bus'
                value={this.state.bus}
                onChange={this.handleInputChange}
              >
                <option value=''></option>
                <option value='wp-TR-6578'>wp-TR-6578</option>
                <option value='wp-TM-6677'>wp-TM-6677</option>
              </select>
            </div>

            <div className='form-group' style={{ marginBottom: '15px' }}>
              <label style={{ marginBottom: '5px' }}>Select Bus Stop</label>
              <select
                className='form-control'
                name='station'
                value={station}
                onChange={this.handleInputChange}
              >
                <option value=''></option>
                {busStops.map((stop, index) => (
                  <option key={index} value={stop}>
                    {stop}
                  </option>
                ))}
              </select>
            </div>

            <div className='form-group' style={{ marginBottom: '15px' }}>
              <label style={{ marginBottom: '5px' }}>Arrival Time</label>
              <input
                type='text'
                className='form-control'
                name='arr_time'
                placeholder='Enter arrival time'
                value={this.state.arr_time}
                onChange={this.handleInputChange}
              />
            </div>

            <div className='form-group' style={{ marginBottom: '15px' }}>
              <label style={{ marginBottom: '5px' }}>Departure Time</label>
              <input
                type='text'
                className='form-control'
                name='dep_time'
                placeholder='Enter departure time'
                value={this.state.dep_time}
                onChange={this.handleInputChange}
              />
            </div>

            <button
              className='btn btn-primary'
              type='submit'
              style={{ marginTop: '15px' }}
              onClick={this.onSubmit}
            >
              <i className='far fa-check-square'></i>
              &nbsp; Save
            </button>
          </form>
        </div>
      </div>
    );
  }
}
