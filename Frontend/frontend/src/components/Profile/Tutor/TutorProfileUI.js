import React from 'react';
import Header from '../../Header/header';


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';

const TutorProfileUI = (props) => {
    return (
    <Container>
    <Header isLoggedIn={true} />
    <Row>
    <Col xs={2}>
    </Col>
    <Col>
        <Jumbotron>
        <div className="profiletutor">
            <img src={props.image} className="photo" />
            <h2>
            ID:{props.username}
            </h2>
        </div>
        </Jumbotron>
    </Col>
    </Row>
    </Container>
    )
}
export default TutorProfileUI;