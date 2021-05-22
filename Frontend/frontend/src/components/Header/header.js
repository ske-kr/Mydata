import React, { Component } from 'react';
import logo from '../Logo/light.png'
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/Button';

class Header extends Component {
  render() {
    return (
      <Navbar className='justify-content-between' bg="dark" variant="dark" expand='lg' >
        <Navbar.Brand >
          <img
            alt=""
            src={logo}
            width="250"
            height="30"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        {this.props.isLoggedIn
          ? <div>
            <Button variant="primary">Profile</Button>
            <Button variant="secondary">Logout</Button>
          </div>
          : <div>
            <Button variant="primary">Sign In</Button>
            <Button variant="secondary">Sign Up</Button>
          </div>
        }
      </Navbar>
    )
  }
}

export default Header;