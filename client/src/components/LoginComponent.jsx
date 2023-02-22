import React, { useState } from 'react'
import NavbarComponent from './NavbarComponent'



const LoginComponent = () => {
  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const { username, password } = state;

  const inputValue = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
    //console.log(name, "=", event.target.value);
  };

  // }
  const submitForm = async (event) => {
    event.preventDefault();
    //console.log({title , content , author});
    console.table({username , password});
    
  };
  return (
    <div className="container p-5">
      <NavbarComponent />
      <hr />
      <h1>เข้าสู่ระบบ | Admin </h1>
      {JSON.stringify(state)}
      <form onSubmit={submitForm}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={inputValue("username")}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={inputValue("password")}
          />
        </div>
        <hr />
        <input type="submit" className="btn btn-primary" value="Submit" />
      </form>
      <br />
    </div>
  );
}

export default LoginComponent