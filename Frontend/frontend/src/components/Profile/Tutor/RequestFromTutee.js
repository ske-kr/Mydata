import React, { Component } from 'react';
import {connect} from 'react-redux';

import * as actionCreators from '../../../redux/profile';
import image from '../image.png';
import './ProfileTutor.css';
import Header from '../../Header/header';
import Navbar from "../../Navbar";
import Footer from "../../Footer";
import RequestTuteeComponent from "./RequestTuteeComponent";
import TutorProfileUI from './TutorProfileUI';

// bootstrap
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Modal from 'react-bootstrap/Modal';

class RequestFromTutee extends Component {
  state = {
    photo: '',
    schedule: '',
    age: '23',
    address: '관악로 25길 11, 402호',
    certificate: null,
    //dummy data
    modalshow: false,
  };

  componentDidMount() {
    this.props.getTutor();
    this.props.getRequstFromTutee();
  }

  
  setShow = (isShown) => {
    this.setState({modalshow: isShown});
  }

  onClickDetail = (request) => {
  }

  render() {
    let tutor = {
      name: "Hong Gil Dong",
      username: "tutoring",
      age: 23,
      subject: "Math",
      gender: "Male",
      phone: "010-1234-5678",
      university: null,
    }

    if (this.props.loadedTutor !== null) {
      tutor = this.props.tutor;
    }


    // 백엔드 맞춰야해용
    let requestTutee = <RequestTuteeComponent name="Lorem Ipsum" onClickDetail={this.onClickDetail(-1)} />;

    if(this.props.loadedRequests.length !== 0) {
      
      requestTutee = this.props.loadedRequests.map((request) => {
        return <RequestTuteeComponent name={request.name} onClickDetail={() => this.onClickDetail(request)} />;
      })
    }
  

    return (
      <>
      <Container>
      <TutorProfileUI username={tutor.username}/>
        <Row>
          <Col xs={2}>
            <div className="button-list">
              <ButtonGroup vertical>
                <Button type="button">Edit Profile</Button>
                <Button type="button">Tutoring</Button>
                <Button type="button" variant="danger">Delete Account</Button>
              </ButtonGroup>
            </div>
          </Col>
          <Col>
            <Jumbotron>
              {requestTutee}
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

      <Modal show={this.state.modalshow} onHide={() => this.setShow(false)}>
        <Modal.Header></Modal.Header>
      </Modal>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    loadedTutor: state.pro.tutor,
    loadedRequests: state.pro.requests
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTutor: () => {
      dispatch(actionCreators.getTutor())
    },
    getRequstFromTutee: (id) => {
      dispatch(actionCreators.getRequstFromTutee(id))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(RequestFromTutee);
