import React, { useContext } from "react";
// import { LoginContext } from "../../context/LoginProvider";
// import LoginContextType from "../../models/User/LoginContextType";
import ServiceUser from "../services/ServiceUser";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LoginContext } from "../context/LoginProvider";
import LoginContextType from "../models/LoginContextType";
type FormData = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
   let { user, setUserCookie } = useContext(LoginContext) as LoginContextType;
  const { register, handleSubmit , formState:{errors} } = useForm<FormData>();
  let userService = new ServiceUser();
  let nav=useNavigate();

  let handleNavHome=()=>{
    nav("/");
  }

  let onSubmit = async (data: FormData) => {

    try {
      console.log(data);
      let user = await userService.login(data);
      console.log(user);
      setUserCookie(user);
      handleNavHome();
     
    } catch (error) {
      console.log(error);
    }
  };



  function handleGoToRegister(){
    nav("/register");
  }

  return (
    <div className="login">

      <div className="login__container">
      <div className="login__container__left">
        <h2 className="login__container__title">Sign in to Account</h2>
        <form
          className="login__container__form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            className="login__container__form__input"
            type="email"
            id="email"
            placeholder="Email"
            {...register("email", { required: true, minLength: 3 })}
          />
          {errors.email && <span>This field email is required</span>}
          <input
            className="login__container__form__input"
            type="password"
            id="password"
            placeholder="Password"
            {...register("password", { required: true, minLength: 3 })}
          />
          {errors.password && <span>This field password is required</span>}
          <button className="button__second" type="submit">
            Log In
          </button>
        </form>
      </div>

      <div className="login__container__right">
        <h2 className="login__container__right__title">New Here ?</h2>
        <p className="login__container__right__text">
          Sing up and discover a greate ammount of new opportunities
        </p>
        <button className="button__signUp" onClick={()=>handleGoToRegister()}>
          Sign up
        </button>
      </div>
      </div>
    </div>
  );
};

export default Login;