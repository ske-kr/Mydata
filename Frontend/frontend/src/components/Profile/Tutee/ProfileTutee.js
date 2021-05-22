import React, { Component } from 'react';
import { connect } from 'react-redux';

import image2 from '../image2.png';
import Header from '../../Header/header';
import './ProfileTutee.css';

import TuteeChildListComponent from './TuteeChildListComponent';
import * as actionCreators from '../../../redux/profile';
import * as loginCreators from '../../../redux/login';

// bootstrap
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';

class ProfileTutee extends Component {
    state = {
    };

    
    componentDidMount() {
      this.props.getTutee();
    }
    
    onClickMatching = (childID) => {
      this.props.sendChildID(childID);
      this.props.history.push('/tutee/match/');
    }

    render() {

      console.log(this.props.authenticated);

      let tutee_manager = {
        name: "Name",
        id: "ID",
        phone: "000-0000-0000",
        address: "SNU"
      };
      
      if (this.props.loadedTutee !== null) {
        // 중요하니깐 한글로 씁니다. 여기에 loadedTutee가 받아져요!!
        // 앞으로 DB를 쓸 거면 얘 형식이 어떻게 될지 알아야합니다
        tutee_manager = this.props.loadedTutee;
      }

      let children = <TuteeChildListComponent name="None" onClickMatching={() => this.onClickMatching(0)}/>;

      if (this.props.loadedChildren.length !== 0) {
        // In here, we map the information from redux
        // 여기도 component에 적절한 값 넣어줘야해요. 지금은 대충 넣었습니다
        children = this.props.loadedChildren.map((child) => (
          <TuteeChildListComponent name={child.name} onClickMatching={() => this.onClickMatching(child.id)}/>
        ))
      }

      return (
        <Container>
          <Header isLoggedIn={true} />
          <Row>
            <Col xs={2}>
            </Col>
            <Col>
              <Jumbotron>
                  <div className="profiletutee">
                    <img src={image2} className="photo" width="300" />
                    <h2>
                      ID: {tutee_manager.id}
                    </h2>
                  </div>
              </Jumbotron>
            </Col>
          </Row>
          <Row>
            <Col xs={2}>
              <div className="button-list">
                <ButtonGroup vertical>
                  <Button variant="dark" type="button">Edit Profile</Button>
                  <Button variant="dark" type="button">Requested Tutoring</Button>
                  <Button variant="dark" type="button" variant="danger">Delete Account</Button>
                </ButtonGroup>
              </div>
            </Col>
            <Col>
              <Jumbotron>
                <h1>
                  Name: {tutee_manager.name /* 이건 확정 아닙니다. backend 따라서 고치죠 */}
                </h1>
                <h3>
                  phonenumber: {tutee_manager.phone}
                </h3>
                <h3>
                  address: {tutee_manager.address}
                </h3>
              </Jumbotron>
            </Col>
            <Col>
              {children}
            </Col>
          </Row>
        </Container>
      );
    }
}

const mapStateToProps = state => {
    return {
        loadedTutee: state.pro.tutee_manager,
        loadedChildren: state.pro.children,
    }
}

const mapDispatchToProps = dispatch => {
    return {
      getTutee: () => {
        dispatch(actionCreators.getTuteeManager())
      },
      sendChildID: (id) => {
        dispatch(actionCreators.sendChildID(id))
      }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileTutee);
