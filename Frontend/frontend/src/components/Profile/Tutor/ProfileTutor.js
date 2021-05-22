import React, { Component } from 'react';
import {connect} from 'react-redux';

import * as actionCreators from '../../../redux/profile';
import image from '../image.png';
import './ProfileTutor.css';
import Header from '../../Header/header';
import Footer from "../../Footer";
import TutorProfileUI from './TutorProfileUI';

// bootstrap
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';

class ProfileTutor extends Component {
  state = {
    photo: '',
    schedule: '',
    age: '23',
    address: '관악로 25길 11, 402호',
    certificate: null,
    //dummy data
    //실제에서는 id(key값)-> data를 불러와서 setstate
  };

  componentDidMount() {
    this.props.getTutor();
  }

  onClickTuteeRequest = (id) => {
    this.props.history.push('/profile/tutor/request');
  }

  render() {
    if (!this.props.auth) {
      alert("not logged in");
      this.props.history.push('/')
    }

    let tutor = {
      name: "Hong Gil Dong",
      username: "testing",
      age: 24,
      subject: "Math",
      gender: "Male",
      phone: "010-1234-5678",
      university: null,
    };
  
    if (this.props.loadedTutor !== null) {
      tutor = this.props.loadedTutor;
    }

    return (
      <>
      <Container>
      <TutorProfileUI image={image} username={tutor.username}/>
        <Row>
          <Col xs={2}>
            <div className="button-list">
              <ButtonGroup vertical>
                <Button type="button">Edit Profile</Button>
                <Button type="button" onClick={() => {this.onClickTuteeRequest(tutor.id);} /*backend에 따라 변경 예정*/}>Requesting Tutee</Button>
                <Button type="button" variant="danger">Delete Account</Button>
              </ButtonGroup>
            </div>
          </Col>
          <Col>
            <Jumbotron>
              <h1>
                Name:{tutor.name}
              </h1>
              <h2>
                Age:{tutor.age}
              </h2>
              <h2>
                Subject:{tutor.subject}
              </h2>
              <h2>
                gender:{tutor.gender}
              </h2>
              <h3>
                phonenumber:{tutor.phone}
              </h3>
              <h3>
                address:{this.state.address}
              </h3>
            </Jumbotron>
          </Col>
        </Row>
      </Container>
      <Footer
        color="white"
        size="normal"
        backgroundImage=""
        backgroundImageOpacity={1}
        copyright="© 2019 Company"
        logo="https://uploads.divjoy.com/logo.svg"
      />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
      auth: state.log.authenticated,
      loadedTutor: state.pro.tutor,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTutor: () => {
      dispatch(actionCreators.getTutor())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileTutor);
