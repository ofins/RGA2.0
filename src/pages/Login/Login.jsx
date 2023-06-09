import React, { useState } from 'react'
import '../../../styles/Login.css'
import { Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from "../../redux/actions";

const Login = () => {
  const dispatch = useDispatch();

  const [user, setUser] = useState({ userName: '', password: '' })
  const [error, setError] = useState('')
  const loginState = useSelector(state => state.login)

  const adminLogin = {
    userName: 'admin',
    password: 'password'
  }

  const LoginNow = (details) => {
    if (details.userName === adminLogin.userName && details.password === adminLogin.password) {
      console.log('logged in!')
      setUser(
        {
          userName: details.userName,
          password: details.password
        }
      )
      dispatch(actions.login(details.userName, details.password))
    } else {
      console.log('Details do not match!')
      setError('Details do not match!')
    }
  }

  const Logout = () => {
    console.log('logged out!')
    setUser({ userName: '', password: '' })
    dispatch(actions.logout())
    setError('')
  }



  return (
    <div className="login--container">
      {(loginState.userName != "") ? (
        <div className="login--welcome">
          <h2>Welcome, <span>{loginState.userName}</span></h2>
          <button onClick={Logout}>Logout</button>
        </div>
      ) :
        <LoginForm LoginNow={LoginNow} error={error} />
      }
    </div>
  )
}

export default Login

function LoginForm({ LoginNow, error }) {
  const [details, setDetails] = useState({ userName: '', password: '' })

  const submitHandler = e => {
    e.preventDefault();
    LoginNow(details);
  }

  return (
    <form className="login--loginBox" onSubmit={submitHandler}>
      <h3>User Login</h3>
      <input onChange={(e) => setDetails({ ...details, userName: e.target.value })} placeholder='username' type="text" name="userName" id="username" />
      <input onChange={(e) => setDetails({ ...details, password: e.target.value })} placeholder='password' type="password" name="password" id="password" />
      <Button variant="dark" type="submit">Login</Button>
      <p >mock-account: username: admin / password: password</p>
    </form>
  )
}