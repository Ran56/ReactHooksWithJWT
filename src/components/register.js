import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Auth from "../services/Auth";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The name must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
      return (
        <div className="alert alert-danger" role="alert">
          The password must be between 6 and 40 characters.
        </div>
      );
    }
  };
  
  const Register = (props) => {
    const form = useRef();
    const checkBtn = useRef();
  
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
  
    const onChangeName = (e) => {
      const name = e.target.value;
      setName(name);
    };
  
    const onChangePassword = (e) => {
      const password = e.target.value;
      setPassword(password);
    };

    const handleRegister = (e) => {
        e.preventDefault();
    
        setMessage("");
        setSuccessful(false);
    
        form.current.validateAll();
    
        if (checkBtn.current.context._errors.length === 0) {
          Auth.register(name, password).then(
            (response) => {
              setMessage(response.data.message);
              setSuccessful(true);
              console.log('response:   ',response);
            },
            (error) => {
              const resMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
    
              setMessage(resMessage);
              setSuccessful(false);
            }
          );
        }
      };

      return (
        <div>
          <div className="input-container">
    
            <Form onSubmit={handleRegister} ref={form}>
              {!successful && (
                <div>
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <Input
                      type="text"
                      className="form-control"
                      name="name"
                      value={name}
                      onChange={onChangeName}
                      validations={[required, vusername]}
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
                  validations={[required, vpassword]}
                />
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">Sign Up</button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={ successful ? "alert alert-success" : "alert alert-danger" }
                role="alert"
              >
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

export default Register;