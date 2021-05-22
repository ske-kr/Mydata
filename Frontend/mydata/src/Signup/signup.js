
import React, { Component } from 'react';
class SignUp extends Component {
    render() {
      return (
        <div>
          <form action="http:://localhost:8000/user/signup/" method="POST" className='signUp'>
            <input placeholder='First Name' name='firstname'/>
            <input placeholder='Last Name' name='lastname'/>
            <input placeholder='Email' name='username'/>
            <input placeholder='Password' name='password'/>
            <button type='submit'>Submit</button>
          </form>
          <a href="/">Sign In</a>
        </div>
      )
    }
  }

  export default SignUp;