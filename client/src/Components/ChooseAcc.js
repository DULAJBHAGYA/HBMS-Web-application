import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import Cards from '../Components/Cards';
import '../Styles/ChooseAcc.css';

export default class ChooseAcc extends Component {
  render() {
    return (
      <div className="choose-acc-container">
        <Link to="/" className="home-icon">
          <FontAwesomeIcon icon={faHome} />
        </Link>
        <h1 className="centered">Choose account</h1>
        <Cards />
      </div>
    );
  }
}

