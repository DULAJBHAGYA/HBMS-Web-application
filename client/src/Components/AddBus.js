import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';

export default class AddBus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bus_no: '',
      name: '',
      chassis_no: '',
      route: '',
      permit_no: '',
      errors: {}
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleInputChange(event) {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      errors: { ...this.state.errors, [name]: '' }
    });
  }

  onSubmit(event) {
    event.preventDefault();
    const { bus_no, name, chassis_no, route, permit_no } = this.state;

    const data = {
      bus_no: bus_no,
      name: name,
      chassis_no: chassis_no,
      route: route,
      permit_no: permit_no,
    };

    axios
      .post('http://localhost:8000/bus/save', data)
      .then((res) => {
        if (res.data.success) {
          this.setState({
            bus_no: '',
            name: '',
            chassis_no: '',
            route: '',
            permit_no: '',
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  validateForm() {
    const { bus_no, name, chassis_no, route, permit_no } = this.state;
    let isValid = true;
    const errors = {};

    if (!/^([a-z]{2}-[A-Z]{2}-\d{4})$/.test(bus_no)) {
      errors.bus_no =
        'Bus number should be in the format: xx-XX-xxxx, where x is a digit or character.';
      isValid = false;
    }

    if (name.length > 30) {
      errors.name = 'Owner name should be less than or equal to 30 characters.';
      isValid = false;
    }

    if (!/^[A-Z\d]{17}$/.test(chassis_no)) {
      errors.chassis_no = 'Chassis number should contain exactly 17 uppercase letters and digits.';
      isValid = false;
    }
    

    if (route.length > 20) {
      errors.route = 'Route should be less than or equal to 20 characters.';
      isValid = false;
    }

    if (!/^[a-z\d]{10}$/.test(permit_no)) {
      errors.permit_no = 'Permit number should contain exactly 10 lowercase letters and digits.';
      isValid = false;
    }

    this.setState({ errors });
    return isValid;
  }

  render() {
    const { errors } = this.state;

    return (
      <div className='container'>
      <NavBar/>
      <div className='col-md-8 mt-4 mx-auto'>
        <h1 className='h3 mb-3 font-weight-normal'>Add new bus</h1>
        <form className='needs-validation' noValidate>
          <div className='form-group' style={{ marginBottom: '15px' }}>
            <label style={{ marginBottom: '5px' }}>Bus number</label>
            <input
              type='text'
              className={`form-control ${errors.bus_no ? 'is-invalid' : ''}`}
              name='bus_no'
              placeholder='Enter bus number Eg:wp-CD-xxxx'
              value={this.state.bus_no}
              onChange={this.handleInputChange}
            />
            {errors.bus_no && <div className="invalid-feedback">{errors.bus_no}</div>}
          </div>

          <div className='form-group' style={{ marginBottom: '15px' }}>
            <label style={{ marginBottom: '5px' }}>Owner name</label>
            <input
              type='text'
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              name='name'
              placeholder='Enter owner name'
              value={this.state.name}
              onChange={this.handleInputChange}
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>

          <div className='form-group' style={{ marginBottom: '15px' }}>
            <label style={{ marginBottom: '5px' }}>Chasis number</label>
            <input
              className={`form-control ${errors.chassis_no ? 'is-invalid' : ''}`}
              name='chassis_no'
              placeholder='Enter chassis number'
              value={this.state.chassis_no}
              onChange={this.handleInputChange}
            />
            {errors.chassis_no && <div className="invalid-feedback">{errors.chassis_no}</div>}
          </div>

          <div className='form-group' style={{ marginBottom: '15px' }}>
            <label style={{ marginBottom: '5px' }}>Route</label>
            <input
              className={`form-control ${errors.route ? 'is-invalid' : ''}`}
              name='route'
              placeholder='Enter route'
              value={this.state.route}
              onChange={this.handleInputChange}
            />
            {errors.route && <div className="invalid-feedback">{errors.route}</div>}
          </div>

          <div className='form-group' style={{ marginBottom: '15px' }}>
            <label style={{ marginBottom: '5px' }}>Permit number</label>
            <input
              className={`form-control ${errors.permit_no ? 'is-invalid' : ''}`}
              name='permit_no'
              placeholder='Enter permit number'
              value={this.state.permit_no}
              onChange={this.handleInputChange}
            />
            {errors.permit_no && <div className="invalid-feedback">{errors.permit_no}</div>}
          </div>
          <Link to='/regbus'>
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

