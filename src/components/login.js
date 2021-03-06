import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Auth from "../services/Auth";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Content Required!
      </div>
    );
  }
};//to check if input with content


const Login = (props) => {
  const form = useRef(); //use useRef to represent this form.

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const onChangeName = (e) => {
    const name = e.target.value;
    console.log('name:   ',name);
    setName(name);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    console.log('password:   ',password);
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();//////

    setLoading(true);

  Auth.login(name, password).then(
    () => {
        props.history.push("/UserInfo"); // go to UserInfo interface
          window.location.reload();//if do not use this statement, after login, narvar will not automatically refresh
          // console.log('inside login component', localStorage) 
        },
        (error)=>{
          console.log('error ',error);
          window.alert("account or password incorrect!");
          setLoading(false);
        }
    );
  } 

  return (
    <div>
      <div className="input-container">

        <Form onSubmit={handleLogin} ref={form}>
          <div className="form-group"> 
          {/* By using Bootstrap CSS Forms Reference----form-group: Container for form input and label */}
            <label htmlFor="username">Username</label>
            <Input
              type="text"
              className="form-control"
              // form-control: Used on input, textarea, and select elements to span the entire width of the page and make them responsive
              name="name"
              value={name}
              onChange={onChangeName}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
              <span>Sign in</span>
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;