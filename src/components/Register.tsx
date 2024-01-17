import React, { useContext, useState } from "react";
import { LoginContext } from "../context/LoginProvider";
import LoginContextType from "../models/LoginContextType";
import ServiceUser from "../services/ServiceUser";
import { useNavigate } from "react-router-dom";
import RegisterRequest from "../dtos/RegisterRequest";

const Register = () => {
  const { user, setUserCookie } = useContext(LoginContext) as LoginContextType;
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  let userService = new ServiceUser();

  let navigate = useNavigate();

  let sing = async () => {
    let data: RegisterRequest = {
      email,
      password,
      username,
    };
    let rez = await userService.addUser(data);
    setUserCookie(rez);
    navigate("/");
  };

  let goLogin = (): void => {
    navigate("/login");
  };

  return (
    <div className="register">
      <div className="register__container">
        <div className="register__container__form">
          <h1>Sign up</h1>
          <div className="register__container__form__box">
            <label htmlFor="chk" aria-hidden="true">
              Username
            </label>
            <input
              type="text"
              name="txt"
              placeholder="First name"
              value={username}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
          </div>

          <div className="register__container__form__box">
            <label htmlFor="chk" aria-hidden="true">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div className="register__container__form__box">
            <label htmlFor="chk" aria-hidden="true">
              Password
            </label>
            <input
              type="password"
              name="pswd"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <div className="register__container__form__boxButton">
            <button className="button__first" onClick={() => sing()}>
              Sign up
            </button>
            <button className="button__second" onClick={() => goLogin()}>
              Login
            </button>
          </div>
          <div />
        </div>
      </div>
    </div>
  );
};

export default Register;
