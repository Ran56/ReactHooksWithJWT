import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
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

const verifyName = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The length of name MUST greater than 3 characters.
      </div>
    );
  }
};

const verifyPassword = (value) => {
    if (value.length < 6 || value.length > 40) {
      return (
        <div className="alert alert-danger" role="alert">
          The length of password MUST between 6 and 40 characters.
        </div>
      );
    }
  };
  
  const Register = () => {
    const form = useRef();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [successful, setSuccessful] = useState(false);
    const nameRef = useRef();
    const passwordRef = useRef();
  
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
    setSuccessful(false);
    form.current.validateAll();
    
    console.log('nameRef.current.value',nameRef.current.value)
    
    if(nameRef.current.value && passwordRef.current.value){
      Auth.register(name, password).then(
        (response) => {
          setSuccessful(true);
          console.log('response:   ',response);
        },
        (error)=>{
          console.log('error ',error);
          window.alert("account or password incorrect!");
          setSuccessful(false);
        })
    } 
    else
    {
      window.alert("Please enter content!");
    }
      
    
    }

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
                      validations={[required, verifyName]}
                      ref={nameRef}
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
                      validations={[required, verifyPassword]}
                      ref={passwordRef}
                    />
                  </div>

                  <div className="form-group">
                    <button className="btn btn-primary btn-block">Sign Up</button>
                  </div>
                </div>
              )}         
            </Form>
          </div>
        </div>
  );
};

export default Register;