import React, { Component } from 'react';
import { connect } from 'react-redux';
import Address from '../Address/address';
import TuteeSignupForm from './TuteeSignupForm'
import PhoneInput from 'react-phone-number-input/input'
import Select from 'react-select'
import AvailableTimes from 'react-available-times'
// import { TimeGridScheduler, classes } from '@remotelock/react-week-scheduler';
import * as actionCreators from '../../redux/signup';
import * as login from '../../redux/login'
import './SignUpTutee.css';

// for Bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class SignUpTutee extends Component {
  constructor() {
    super();
    this.state = {
      step: 0,
      id: '',
      password: '',
      password_confirmation: '',
      name: '',
      gender: '',
      age: 0,
      phone: '',
      subject: '',
      schedule: [],
      address: [],
      detail: [],
    }
  }
  selectAddress = (address, X, Y) => {
    this.setState({ address: [address, X, Y]})
    console.log(this.state.address)
  }
  ChangeSubject = (subject) => {
    this.setState({ subject: subject })
    console.log(this.state.subject)
  }
  ClickConfirm = () => {
    let tutee = {}
    tutee['username'] = this.state.id;
    tutee['password'] = this.state.password;
    tutee['name'] = this.state.name;
    tutee['phonenumber'] = this.state.phone;
    tutee['age'] = this.state.age;
    tutee['subject'] = ''
    if (this.state.subject.length !== 0) {
      for(var i = 0; i < this.state.subject.length; i++){
        tutee['subject'] = tutee['subject'].concat(this.state.subject[i].value + ' ');
      }
    }
    tutee['gender'] = this.state.gender;
    tutee['schedule'] = this.state.schedule;
    tutee['address'] = {'Road': this.state.address[0], 'X': this.state.address[1], 
      'Y': this.state.address[2], 'detail': this.state.detail}
    tutee = JSON.stringify(tutee)
    console.log(tutee);
    actionCreators.signUpTutee(tutee);
    this.props.history.push('/profile/tutee')
  }

  ClickNext = () => {
    this.setState({
      step: this.state.step + 1
    })
  }
  CheckUniqueID = () => {
    if (this.state.id != '' && this.state.password != '' && this.state.password == this.state.password_confirmation) {
      actionCreators.uniqueID(this.state.id).then(res => {
          if (res.status == 200) {
            this.setState({ step: this.state.step + 1 })
          } else {
            alert('ID already exists')
          }
        })
    } else if (this.state.id == '') {
      alert('Fill in the ID')
    } else if (this.state.password == '' || this.state.password_confirmation == '') {
      alert('Fill in the password')
    } else if (this.state.password_confirmation != this.state.password) {
      alert('password and confimation are not matching')
    }
  }
  detailAddress = (detail) => {
    this.setState({detail: detail})
  }
  render() {
    const options = [
      { value: 'korean', label: 'Korean' },
      { value: 'math', label: 'Math' },
      { value: 'english', label: 'English' },
      { value: 'science', label: 'Science' },
      { value: 'social study', label: 'Social Study' },
    ]

    let input = <div></div>;
    switch (this.state.step) {
      case 0:
        input =
          <div className="login-form" style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)'
        }}>
            <Form.Group>
              <div className="id">
                <Form.Label>ID</Form.Label>
                <Form.Control
                  className="text-left"
                  onChange={(e) => this.setState({ id: e.target.value })}
                  value={this.state.id}
                />
              </div>
              <div className="password">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  className="text-left"
                  onChange={(e) => this.setState({ password: e.target.value })}
                  value={this.state.password}
                />
              </div>
              <div className="password-confirmation">
                <Form.Label>Password Confirmation:</Form.Label>
                <Form.Control
                  type="password"
                  className="text-left"
                  onChange={(e) => this.setState({ password_confirmation: e.target.value })}
                  value={this.state.password_confirmation}
                />
              </div>
              <br/>
              <Button onClick={this.CheckUniqueID} >Next</Button>
            </Form.Group>
          </div>
        break;
      case 1:
        input =
          <div className="login-form" style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)'
        }}>
            <label>
              Name:
                <Form.Control onChange={(e) => this.setState({ name: e.target.value })} />
            </label>
            <label>
              Age:
                <Form.Control onChange={(e) => this.setState({ age: e.target.value })} />
            </label>
            <label>
              Gender:
                <Select options={[{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }]}></Select>
            </label>
            <br/>
            <Form.Label>Phone number:</Form.Label>
            <PhoneInput className="text-left"
              country="KR"
              value={this.state.phone}
              onChange={value => this.setState({ phone: value })}
            />
            <label className="subject-label">
              Subject
                <div className='select'>
                <Select options={options} closeMenuOnSelect={false} isMulti={true} onChange={(selectedoptions) => this.ChangeSubject(selectedoptions)} />
              </div>
            </label>
            <Address className="address" onSelectAddress={this.selectAddress} onDetailAddress={this.detailAddress} />
            <Button onClick={this.ClickNext}>Next</Button>
          </div>
        break;
      case 2:
        input =
          <div className="login-form">
            <AvailableTimes height={1000} onChange={(e) => this.setState({ schedule: e })} />
            <Button type="button" onClick={this.ClickConfirm}>Confirm</Button>
          </div>
        break;
    }

    return (
      <div>
        {input}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    // storedLogIn: state.login.logged
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // signUp: (session) => dispatch(actionCreators.(session)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpTutee);
