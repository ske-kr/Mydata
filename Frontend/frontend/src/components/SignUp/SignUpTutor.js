import React, { Component } from 'react';

import { connect } from 'react-redux';

import PhoneInput from 'react-phone-number-input/input'
import Select from 'react-select'
import AvailableTimes from 'react-available-times'
import './SignUpTutor.css';
import Address from '../Address/address';
import * as actionCreators from '../../redux/signup';
import Certificate from '../Certificate/Certificate';

// bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Jumbotron from 'react-bootstrap/Jumbotron';

class SignUpTutor extends Component {
  state = {
    step: 0,
    id: '',
    password: '',
    password_confirmation: '',
    certificate: '',
    name: '',
    age: '',
    university: '',
    isAuthorized: false,
    phone: '',
    subject: [],
    address: [],
    schedule: [],
  };

  handleFileUpload = (event) => {
    const formData = new FormData();
    formData.append('file', event.target.files[0]);
    this.setState({ isAuthorized: true })
  };
  ChangeSubject = (subject) => {
    this.setState({ subject: subject })
  }
  ChangeUniversity = (university) => {
    this.setState({ university: university })
  }
  CheckUniqueID = () => {
    if (this.state.id != '' && this.state.password != '' && this.state.password == this.state.password_confirmation) {
      actionCreators.uniqueID(this.state.id).then(res => {
        if (res.status == 200){
          this.setState({ step: this.state.step+1})
        } else {
          alert('ID already exists')
        }
      })
    } else if (this.state.id == ''){
      alert('Fill in the ID')
    } else if (this.state.password == '' || this.state.password_confirmation == ''){
      alert('Fill in the password')
    } else if (this.state.password_confirmation != this.state.password){
      alert('password and confimation are not matching')
    }
  }

  // These three set functions put information given by certificate
  setName = (name) => {
    this.setState({
      name: name
    })
  }
  setAge = (age) => {
    this.setState({
      age: age
    })
  }
  setUniversity = (university) => {
    this.setState({
      university: university
    })
  }

  ClickConfirm = () => {
    let tutor = {}
    tutor['username'] = this.state.id;
    tutor['password'] = this.state.password;
    tutor['name'] = this.state.name;
    tutor['phonenumber'] = this.state.phone;
    tutor['age'] = this.state.age;
    tutor['subject'] = ''
    if (this.state.subject.length !== 0) {
      for(var i = 0; i < this.state.subject.length; i++){
        tutor['subject'] = tutor['subject'].concat(this.state.subject[i].value + ' ');
      }
    }
    tutor['gender'] = this.state.gender;
    tutor['schedule'] = this.state.schedule;
    tutor['address'] = this.state.address;
    tutor = JSON.stringify(tutor)
    console.log(tutor);
    actionCreators.signUpTutor(tutor);
    this.props.history.push('/profile/tutor/')
  }
  inputSchedule = (e) => {
    this.setState({ schedule : e })
  }
  selectAddress = (address, X, Y, index) => {
    var arr = this.state.address;
    if(index%2 == 0){
      index = index / 2;
      if(arr[index] == null){
        arr[index] = {};
      }
      arr[index]['startRoad'] = address;
      arr[index]['startX'] = X;
      arr[index]['startY'] = Y;
    } else {
      index = (index - 1) / 2
      if(arr[index] == null){
        arr[index] = {};
      }
      arr[index]['endRoad'] = address;
      arr[index]['endX'] = X;
      arr[index]['endY'] = Y;
    }
    this.setState({ address: arr})
    console.log(this.state.address)
  }

  render() {
    let message = '';
    if (this.state.isAuthorized) {
      message = 'Your certified has been authorized!'
    }
    const options = [
      { value: 'korean', label: 'Korean' },
      { value: 'math', label: 'Math' },
      { value: 'english', label: 'English' },
      { value: 'science', label: 'Science' },
      { value: 'social study', label: 'Social Study' },
    ]
    let input = <div></div>
    var index = -2;
    const addressInput = this.state.schedule.map((x) => {
      var dayReg = /^([A-Za-z]{3})/g
      var timeReg = /([0-9]{2}:[0-9]{2})/g;
      var timeReg2 = /([0-9]{2}:[0-9]{2})/g;
      let start = x.start.toString()
      let end = x.end.toString()
      let Day = dayReg.exec(start)[1]
      let startTime = timeReg.exec(start)[1]
      let endTime = timeReg2.exec(end)[1]
      index += 2;
      return(
        <div key={index+0.5}>
          <div key={index+0.3}>{Day}{startTime}~{endTime}</div>
          <Address key={index} id={index} index={index} onSelectAddress={this.selectAddress}/>
          <Address key={index+1} id={index+1} index={index+1} onSelectAddress={this.selectAddress}/>
        </div>
      )
    })
    switch (this.state.step) {
      case 0:
        input =
          <div style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)'
        }}>
            <Form.Group className="signuptutor-label-id">ID:
          <Form.Control
                type="text"
                className="text-left"
                onChange={(event) => this.setState({ id: event.target.value })}
              />
            </Form.Group>
            <div className="signuptutor-label-password">Password:
          <Form.Control
                type="password"
                className="text-left"
                onChange={(event) => this.setState({ password: event.target.value })}
              />
            </div>
            <div className="signuptutor-label-password">Password confirmation:
          <Form.Control
                type="password"
                className="text-left"
                onChange={(event) => this.setState({ password_confirmation: event.target.value })}
              />
            </div><br/>
            <Button onClick={this.CheckUniqueID}>Next</Button>
          </div>
        break;
      case 1:
        input =
          <div style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)'
        }}>
            <label className="signuptutor-label-certificate">Photo:</label>
            <Form.Control type="file" className="signuptutor-input-photo" />
            <div className="signuptutor-div-authorize">
              <label className="signuptutor-label-certificate">Certificate:</label>
              <Certificate age={this.setAge} name={this.setName} university={this.setUniversity}/>
            </div><br/>
            <Button onClick={() => this.setState({ step: this.state.step + 1 })}>Next</Button>
            <Button onClick={() => this.setState({ step: this.state.step + 1 })}>Skip</Button>
          </div>
        break;
      case 2:
        input =
          <div style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)'
        }}>
            <label>
              Phone number
              <PhoneInput
                className="phoneinput"
                country="KR"
                value={this.state.phone}
                onChange={value => this.setState({ phone: value })}
              />
            </label>
            <br/>
            <label>
              Gender:
              <Select options={[{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }]}></Select>
            </label>
            <br/>
            <label className="subject-label">
              Subject
              <div className='select'>
                <Select options={options} closeMenuOnSelect={false} isMulti={true} onChange={(selectedoptions) => this.ChangeSubject(selectedoptions)} />
              </div>
            </label>
            <br/>
            <Button onClick={() => this.setState({ step: this.state.step + 1 })}>Skip</Button>
            <Button onClick={() => this.setState({ step: this.state.step + 1 })}>Next</Button>
          </div>
        break;
      case 3:
        input =
          <div className="timetable">
            <AvailableTimes height={1000} onChange={(e) => this.inputSchedule(e)} />
            <div>{addressInput}</div>
            <Button onClick={this.ClickConfirm}>Skip</Button>
            <Button onClick={this.ClickConfirm}>Confirm</Button>
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
    unique: state.sig.unique,
  }
}

const mapDispatchToProps = dispatch => ({
  checkUniqueID: (id) => dispatch(actionCreators.uniqueID(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUpTutor);
