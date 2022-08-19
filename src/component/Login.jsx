import React, { Component } from "react";
import "./Login.css";
import Logo from "../img/logo.png";
import axios from "axios";
import { siteSetting } from "./setting/site-setting";
import { css } from "@emotion/core";
import { ScaleLoader } from "react-spinners";

import {
  HashRouter as Router,
  Route,
  Link,
  Redirect,
  DefaultRoute
} from "react-router-dom";
import history from "../history";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      response: {},
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    event.preventDefault();
    const target = event.target;
    this.setState({
      [target.name]: target.value,
    });
    console.log("username", this.state);
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    console.log("call");
    const url = siteSetting + "auth/login";
    const body = {
      Email: this.state.username,
      Password: this.state.password,
    };

    try {
      await axios.post(url, body).then((res) => {
        if (res?.data?.status === true) {
          const resp = res?.data;
          localStorage.setItem("rememberMe", resp?.token);
          localStorage.setItem("_id", resp?.userDetails?._id);
            localStorage.setItem("Account", resp?.userDetails?.Account);
            localStorage.setItem("Name", resp?.userDetails?.Name);

          localStorage.setItem("isLogin", res?.data?.status);
          console.log("reeee", resp);

          switch(resp?.userDetails?.Account){
            case "1" :
              return history.push('/admin');
            
            case "2" : 
               return history.push('/hr');

            case "3" : 
               return history.push('/employee');   
          }

          history.push('/hr')
          //  this.setState({ response: resp })
        }
      });
    } catch (error) {
      console.log("error", error?.message);
    }
  };

  render() {
    // let value=(this.props.pass) ? undefined : "";

    return (
      <div>
        <div className="container">
          <div id="main-outer-div">
            <div id="logo-div">
              <img id="logo-img" src={Logo} alt="" />
            </div>
            <div id="title-div">
              <h4 className="title">Sign in</h4>
            </div>

            <div id="outer-login-form-div">
              <form action="" method="" onSubmit={this.handleSubmit}>
                {/* <div className="form-group"> */}
                <input
                  className="login-form-input"
                  type="text"
                  // className="form-control"
                  placeholder="Email"
                  required="required"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleInputChange}
                />
                {/* </div> */}
                {/* <div className="form-group"> */}
                <input
                  className="login-form-input"
                  type="password"
                  // className="form-control"
                  placeholder="Password"
                  required="required"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                />
                {/* </div> */}
                {/* <div className="form-group"> */}
                <input
                  className="login-form-input"
                  type="submit"
                  // className="btn btn-primary btn-block btn-lg btn-mystyle"
                  value="Sign in"
                  id="submitBtn"
                />
                {/* </div> */}
                {!this.props.pass ? (
                  <p className="alert">Invalid UserName or Password</p>
                ) : (
                  ""
                )}
              </form>
            </div>

            <div className="loading">
              <ScaleLoader
                css={override}
                sizeUnit={"px"}
                size={150}
                color={"#123abc"}
                loading={this.props.loading}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
