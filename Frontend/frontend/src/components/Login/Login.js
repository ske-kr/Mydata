import React, { Component } from 'react';
import './Login.css';
import logo from '../Logo/dark.png';

// import React-Bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Modal from 'react-bootstrap/Modal';
import * as actionCreators from '../../redux/login'

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      modalshow: false,
    }
  }

  setShow = (isShown) => {
    this.setState({ modalshow: isShown });
  }
  loginHandler = () => {
    if (this.state.username == '') {
      alert('Fill ID')
    } else if (this.state.password == '') {
      alert('Fill password')
    } else {
      let login_info = { username: this.state.username, password: this.state.password }
      actionCreators.login(login_info)
        .then((res) => {
          if (res.status == 204) {
            this.props.history.push('/profile/tutor/')
          } else {
            this.props.history.push('/tutee/match/')
          }
        })
        .catch((error) => {
          alert('wrong ID or password')
        })
    }
  }
  render() {
    return (
      <Jumbotron className="login">
        <img className="logo" src={logo} />
        <Form.Group className="login">
          <Form.Label>ID</Form.Label>
          <Form.Control
            id="id-input"
            type="text"
            value={this.state.username}
            onChange={(event) => { this.setState({ username: event.target.value }) }}
          />
          <br />
          <Form.Label>password</Form.Label>
          <Form.Control
            id="pw-input"
            type="password"
            value={this.state.password}
            onChange={(event) => { this.setState({ password: event.target.value }) }}
          />
          <br />
        </Form.Group>
        <div id="buttons">
          <Button id="login-button" onClick={() => this.loginHandler()}>Sign in</Button>
          <Button id="signup-button" onClick={() => this.setShow(true)}>Sign up</Button>
        </div>

        <Modal show={this.state.modalshow} onHide={() => this.setShow(false)}>
          <Modal.Header><Modal.Title>Sign Up</Modal.Title></Modal.Header>
          <Modal.Body>Are you a tutee? Or are you a tutor?</Modal.Body>
          <Modal.Footer>
            <Button variant="outline-dark" onClick={() => this.props.history.push('/signup/tutor/')}>
              Tutor
            </Button>
            <Button variant="outline-dark" onClick={() => this.props.history.push('/signup/tutee/')}>
              Tutee
            </Button>
          </Modal.Footer>
        </Modal>

      </Jumbotron>
    )
  }
}

export default Login;
