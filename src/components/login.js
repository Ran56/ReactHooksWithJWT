import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Auth from "../services/Auth";
import App from '../App';
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
  const checkBtn = useRef(); //use useRef to represent this button.

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
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
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();//to check if there is data inside

    if (checkBtn.current.context._errors.length === 0) {
      Auth.login(name, password).then(
        () => {
          props.history.push("/UserInfo"); // go to UserInfo interface
          window.location.reload();//if do not use this statement, after login, narvar will not automatically refresh
          // console.log('inside login component', localStorage) 
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
        );
    } else {
      setLoading(false);
    }
  };

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
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Sign in</span>
            </button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Login;