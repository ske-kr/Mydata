import React, { Component } from 'react';
import Select from 'react-select'
import AvailableTimes from 'react-available-times'
import './TuteeSignupForm.css';

// for bootstrap
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';

class TuteeSignupForm extends Component {
  constructor() {
    super();
  }
  render() {
    const options = [
      { value: 'korean', label: 'Korean' },
      { value: 'math', label: 'Math' },
      { value: 'english', label: 'English' },
      { value: 'science', label: 'Science' },
      { value: 'social study', label: 'Social Study' },
    ]
    return (
      <div>
        <label className="child-name-label">
          Name
          <Form.Control
            className="child-name-input"
            onChange={(e) => this.props.onChangeName(e.target.value, this.props.id)}
            value={this.props.name}
          />
        </label>
        <br/>
        <label className="subject-label">
          <div className="select">
          Subject
          <Select className="select" options={options} closeMenuOnSelect={false} isMulti={true} onChange={(selectedoptions) => this.props.onChangeSubject(selectedoptions, this.props.id)}/>
          </div>
        </label>
        <br/>
        <label>
          Age
          <Form.Control/>
        </label>
        <br/>
        <label>
          Gender
          <Select options={[{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }]}></Select>
        </label>
        <br/>
        <label>Available Time</label>
        <div className="timetable">
          <AvailableTimes height={600} onChange={(e) => console.log(e)}/>
        </div>
        <div className="delete">
          {this.props.id !== 0 ? <Button onClick={() => this.props.onClickDelete(this.props.id)}>delete</Button> : null}
        </div>
      </div>
    )
  }
}

export default (TuteeSignupForm);
