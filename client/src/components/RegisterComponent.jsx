import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";




const RegisterComponent = () => {

 const [register, setRegister] = useState({

   username:"" ,
   password:""  ,
   confirmpass:"" 
 });

 //console.log(register);

 const handleRegister = (e) => {

 setRegister({ ...register, [e.target.name]: e.target.value});

 }

 const submitForm = (e) => {
  e.preventDefault();
  
  if(register.password !== register.confirmpass){
    alert('รหัสผ่านไม่ตรงกัน')
  }else{
    alert('โอเค')
  }
 }
  return (
    <div>
      <h1>ResgisterComponent</h1>
      <div className="from-control">
        <Form onSubmit={submitForm}>
          <div onChange={handleRegister}>
            <InputGroup className="border mt-3">
              <InputGroup.Text>Username</InputGroup.Text>
              <Form.Control className="form-control input-lg" name="username" />
            </InputGroup>

            <InputGroup className="mt-3">
              <InputGroup.Text>Password</InputGroup.Text>
              <Form.Control className="form-control input-lg" name="password" />
            </InputGroup>

            <InputGroup className="mt-3">
              <InputGroup.Text>Confirm Password</InputGroup.Text>
              <Form.Control
                className="form-control input-lg"
                name="confirmpass"
              />
            </InputGroup>
          </div>

          <Button
            className="mt-3"
            type="submit"
            disabled={register.password.length < 6 || register.confirmpass.length < 6}
          >
            Register
          </Button>
        </Form>
      </div>
    </div>
  ); 
};

export default RegisterComponent;
