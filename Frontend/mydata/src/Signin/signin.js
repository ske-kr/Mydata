
import React, { Component } from 'react';
class SignIn extends Component {
    render() {
      return (
        <div>
          <form action="http:://localhost:8000/user/signin/" method="POST" className='signUp'>
            <input placeholder='Email' type='email'/>
            <input placeholder='Password' type='password'/>
            <button type='submit'>Submit</button>
          </form>
          <a href="/SignUp">Sign Up</a>
        </div>
      )
    }
  }

  export default SignIn;