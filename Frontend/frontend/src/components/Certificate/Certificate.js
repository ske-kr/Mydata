import React, { Component } from "react";
import { connect } from 'react-redux';

import * as actionCreators from '../../redux/certificate';

import Form from 'react-bootstrap/Form';

class Certificate extends Component {
  state = {
    name: "",
    age: "",
    university: ""
  }

  certificateUpload = (e) => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    this.props.certificateFile(formData);
  }

  render() {
    let list = null;
    let name = "", age = "", university = "", department = "";
    let departmentList = [];

    if (this.props.ocr !== null) {
      console.log(this.props.ocr.recognition_words)

      this.props.ocr.recognition_words.forEach(element => {
        let nameRe = /명.*:.*([가-힣]).*([가-힣]).*([가-힣])/;
        let birthRe = /([20|19][0-9]{3})/;
        let univRe = /([가-힣]*대\w*학\w*교)/;
        let departRe = /([가-힣]*학과|[가-힣]*학부)/;

        if (nameRe.test(element)) {
          name = RegExp.$1 + RegExp.$2 + RegExp.$3;
          this.props.name(name);
          console.log(name);
        }
        if (birthRe.test(element)) {
          let numberElement = Number(RegExp.$1);
          if (numberElement !== 2019) {
            console.log(RegExp.$1);
            age = new Date().getFullYear() - numberElement + 1;
            this.props.age(age)
          }
        }
        if (univRe.test(element)) {
          university = RegExp.$1;
          this.props.university(university)
        }
        if (departRe.test(element)) {
          department += RegExp.$1 + " ";
          departmentList.push(RegExp.$1);
        }
      });
      list = <div>
        <p>Name: {name}</p>
        <p>Age: {age}</p>
        <p>University: {university}</p>
        <p className="department">Department: {department}</p>
      </div>
      console.log(departmentList);
    }

    return (
      <div>
        <Form.Control type="file" className="signuptutor-input-certificate"
          onChange={event => this.certificateUpload(event)} />
        {list}
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    ocr: state.cer.ocr
  }
}

const mapDispatchToProps = dispatch => {
  return {
    certificateFile: (file) => {
      dispatch(actionCreators.certificateTutor(file))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Certificate);
