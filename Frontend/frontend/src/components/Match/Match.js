import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actionCreators from '../../redux/match';

import MatchedTutor from './MatchedTutor';
import ReviewBody from '../Review/ReviewBody';

import './Match.css'
import Header from '../Header/header'
import profile1 from '../Profile/image.png'
import profile2 from '../Profile/image2.png'

// bootstrap
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Media from 'react-bootstrap/Media';
import Modal from 'react-bootstrap/Modal';


// slider
import { Slider, Rail, Handles, Tracks, Ticks } from 'react-compound-slider';

// const variables for slider
const sliderStyle = {  // Give the slider some width
    position: 'relative',
    width: '100%',
    height: 80,
}

const railStyle = {
    position: 'absolute',
    width: '100%',
    height: 10,
    marginTop: 35,
    borderRadius: 5,
    backgroundColor: '#8B9CB6',
}


export function Handle({
    handle: { id, value, percent },
    getHandleProps
  }) {
    return (
      <div
        style={{
          left: `${percent}%`,
          position: 'absolute',
          marginLeft: -15,
          marginTop: 25,
          zIndex: 2,
          width: 30,
          height: 30,
          border: 0,
          textAlign: 'center',
          cursor: 'pointer',
          borderRadius: '50%',
          backgroundColor: '#2C4870',
          color: '#333',
        }}
        {...getHandleProps(id)}
      >
    <div style={{ fontFamily: 'Segoe UI', fontSize: 11, marginTop: -25 }}>
        {value}
    </div>
    </div>
    )
}

function Track({ source, target, getTrackProps }) {
return (
    <div
    style={{
        position: 'absolute',
        height: 10,
        zIndex: 1,
        marginTop: 35,
        backgroundColor: '#062047',
        borderRadius: 5,
        cursor: 'pointer',
        left: `${source.percent}%`,
        width: `${target.percent - source.percent}%`,
    }}
    {...getTrackProps() /* this will set up events if you want it to be clickeable (optional) */}
    />
    )
}


function Tick({ tick, count }) {
    return (
      <div>
        <div
          style={{
            position: 'absolute',
            marginTop: 52,
            marginLeft: -0.5,
            width: 1,
            height: 8,
            backgroundColor: 'silver',
            left: `${tick.percent}%`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            marginTop: 60,
            fontSize: 10,
            textAlign: 'center',
            marginLeft: `${-(100 / count) / 2}%`,
            width: `${100 / count}%`,
            left: `${tick.percent}%`,
          }}
        >
          {tick.value}
        </div>
      </div>
    )
}
  

class Match extends Component {
    state = {
        gender: 3,
        subject: 31,
        minAge: 20,
        maxAge: 40,
        genderStat: [0, 0],
        subjectStat: [0, 0, 0, 0, 0],
        modalshow: false
    };
    
    componentDidMount() {
      this.props.getTutors(this.props.childID, 3, 31, 20, 40);
    }

    
    onChangeGender = (e) => {
        let current = this.state.gender;
        switch (e.target.className) {
            case "Male":
                this.setState({gender: this.state.gender ^ 1});
                current = current ^ 1;
                break;
            case "Female":
                this.setState({gender: this.state.gender ^ 2});
                current = current ^ 2;
                break;
            default:
                console.log("Something went wrong on onChangeGender!!");
        }

        this.props.getTutors(this.props.childID, current, this.state.subject, this.state.minAge, this.state.maxAge);
    }


    onChangeSubject = (e) => {
        console.log(e.target.className);
        let current = this.state.subject;
        switch (e.target.className) {
            case "Korean":
                this.setState({subject: this.state.subject ^ 1});
                current = current ^ 1;
                break;
            case "English":
                this.setState({subject: this.state.subject ^ 2});
                current = current ^ 2;
                break;
            case "Math":
                this.setState({subject: this.state.subject ^ 4});
                current = current ^ 4;
                break;
            case "Social":
                this.setState({subject: this.state.subject ^ 8});
                current = current ^ 8;
                break;
            case "Science":
                this.setState({subject: this.state.subject ^ 16});
                current = current ^ 16;
                break;
        }

        this.props.getTutors(this.props.childID, this.state.gender, current, this.state.minAge, this.state.maxAge);
    }

    onChangeAge = (e) => {
        console.log(e[0]);
        console.log(e[1]);
        this.setState({minAge: e[0]});
        this.setState({maxAge: e[1]});

        this.props.getTutors(this.props.childID, this.state.gender, this.state.subject, e[0], e[1]);
    }


    setShow = (isShown) => {
        this.setState({modalshow: isShown});
    }

    onClickDetail = (id) => {
        this.props.getReviewByID(id);
        this.setShow(true);
    }

    render() {
        // This gives the tutor basic information in MatchedTutor
        let tutors = this.props.loadedTutor; 

        // for UI testing when no matching is caught
        let jsxitems = <MatchedTutor 
                        className="tutor0"
                        id={0}
                        profile={profile2}
                        gender="None"
                        subject="None"
                        onClickDetail={() => this.onClickDetail(0)}
                        />;

        if (tutors.length !== 0) {
            jsxitems = tutors.map((tutor) => {

                return <MatchedTutor 
                        className={tutor + tutor.id}
                        id={tutor.id}
                        proflie={tutor.profile}
                        gender={tutor.gender}
                        subject={tutor.subject}
                        onClickDetail={() => this.onClickDetail(tutor.id)} />
            })
        }

        // This will give get review
        let reviews = this.props.reviewByID;

        let reviewComponent = <ReviewBody title="No Review here" content="Please write review for this tutor"/>

        if (reviews.length !== 0) {
            reviewComponent = <ReviewBody title={reviews.title} content={reviews.content}/>
        }

        return (
            <div className="matching">
                <Header isLoggedIn={true} />
                <Jumbotron id="jumbo">
                    <Container id="condition">
                        <Row>
                            <Col>
                                <legend>Gender</legend>
                            </Col>
                            <Col>
                                <legend>Subject</legend>
                            </Col>
                            <Col>
                                <legend>Age</legend>
                            </Col>
                        </Row>
                        <Row>
                            <Col id="query-item">
                                <Row>
                                    <input type='checkbox' id = "Male" className="Male"
                                        defaultChecked='true' onClick={(event) => {this.onChangeGender(event)}} /> Male ({this.state.genderStat[0]})
                                </Row>
                                <Row>
                                    <input type='checkbox' className="Female"
                                        defaultChecked='true' onClick={(event) => {this.onChangeGender(event)}} /> Female ({this.state.genderStat[1]})
                                </Row>
                            </Col>
                            <Col id="query-item">
                                <Row>
                                    <input type="checkbox" className="Korean"
                                    defaultChecked='true' onClick={(event) => {this.onChangeSubject(event)}}/> Korean ({this.state.subjectStat[0]})
                                </Row>
                                <Row>
                                    <input type="checkbox" className="English"
                                    defaultChecked='true' onClick={(event) => {this.onChangeSubject(event)}}/> English ({this.state.subjectStat[1]})
                                </Row>
                                <Row>
                                    <input type="checkbox" defaultChecked='true' className="Math"
                                        onChange={(event) => {this.onChangeSubject(event)}}/> Math ({this.state.subjectStat[2]})
                                </Row>
                                <Row>
                                    <input type="checkbox" className="Social"
                                    defaultChecked='true' onChange={(event) => {this.onChangeSubject(event)}}/> Social Study ({this.state.subjectStat[3]}) 
                                </Row>
                                <Row>
                                    <input type="checkbox" defaultChecked='true' className="Science"
                                        value = {this.state.age}
                                        onChange={(event) => {this.onChangeSubject(event)}}/> Science ({this.state.subjectStat[4]})
                                </Row>
                            </Col>
                            <Col>
                                <Row>
                                    <Slider
                                        rootStyle = {sliderStyle}
                                        domain = {[20, 40]}
                                        step={1}
                                        mode={2}
                                        values = {[20, 40]}
                                        onChange={(event) => {this.onChangeAge(event)}}
                                        >
                                            <Rail>
                                                {({ getRailProps }) => (
                                                    <div style={railStyle} {...getRailProps()} />
                                                )}
                                            </Rail>
                                        <Handles>
                                            {({ handles, getHandleProps }) => (
                                                <div className="slider-handles">
                                                    {handles.map(handle => (
                                                        <Handle
                                                            key={handle.id}
                                                            handle={handle}
                                                            getHandleProps={getHandleProps}
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                        </Handles>
                                        <Tracks left={false} right={false}>
                                            {({ tracks, getTrackProps }) => (
                                                <div className="slider-tracks">
                                                {tracks.map(({ id, source, target }) => (
                                                    <Track
                                                    key={id}
                                                    source={source}
                                                    target={target}
                                                    getTrackProps={getTrackProps}
                                                    />
                                                ))}
                                                </div>
                                            )}
                                        </Tracks>
                                        <Ticks count={5}>
                                        {({ ticks }) => (
                                            <div className="slider-ticks">
                                            {ticks.map(tick => (
                                                <Tick key={tick.id} tick={tick} count={ticks.length} />
                                            ))}
                                            </div>
                                        )}
                                        </Ticks>
                                    </Slider>
                                    Put your wish range of tutors' age
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </Jumbotron>
                <div className="result">
                    {jsxitems};
                </div>
            

                <Modal show={this.state.modalshow} onHide={() =>this.setShow(false)}>
                    <Modal.Header>
                        <Media>
                            <img
                                width={64}
                                height={64}
                                src={profile2 /* redux로 교체하기 */}
                                alt="Profile photo"
                                rounded="true"
                            />
                            <Media.Body>
                                <Container>
                                <Row>
                                    <Col>
                                    <p><b>{this.props.name}</b></p>
                                    <p>{this.props.gender}</p>
                                    </Col>
                                    <Col>
                                    <p>{this.props.subject}</p>
                                    </Col>
                                    <Col>
                                    {/* 데모 때는 스케쥴을 둘만 넣었는데 어떻게 넣을지 고려해봐야겠네요 
                                    <p>{this.props.available[0]}</p>
                                    <p>{this.props.available[1]}</p>
                                    */}
                                    </Col>
                                </Row>
                                </Container>
                            </Media.Body>
                        </Media>
                    </Modal.Header>
                    <Modal.Body>
                        {reviewComponent}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-dark" onClick={() => {}}>
                            Request
                        </Button>
                        <Button variant="outline-dark" onClick={() => this.setShow(false)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            
        )
    }
}

const mapStateToProps = state => {
    return {
      loadedTutor: state.mat.tutors,
      reviewByID: state.mat.reviewByID,
      childID: state.pro.sentChildID
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // ProfileTutee에서부터 받은 childID, 그리고 여기서 설정한 각종 설정 등을 맞춰서 올려보내줍니다
        getTutors: (childID, gender, subject, minAge, maxAge) => dispatch(actionCreators.getTutor(childID, gender, subject, minAge, maxAge)),
        getReviewByID: (id) => dispatch(actionCreators.getReviewByID(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Match));