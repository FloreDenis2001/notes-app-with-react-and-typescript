import React from "react";
import ApiServer from "../utils/ApiServer";
import LoginRequest from "../dtos/LoginRequest";
import UserLogin from "../models/UserLogin";
import RegisterRequest from "../dtos/RegisterRequest";

class ServiceUser extends ApiServer {
  login = async (user: LoginRequest): Promise<UserLogin> => {
    const data = await this.api<LoginRequest, UserLogin>(
      `auth/login`,
      "POST",
      user,
      ""
    );
    if (data.status === 200) {
      const user = await data.json();
      return user;
    } else {
      return Promise.reject([]);
    }
  };

  addUser = async (user: RegisterRequest): Promise<UserLogin> => {
    const data = await this.api<RegisterRequest, UserLogin>(
      `users/addUser`,
      "POST",
      user,
      ""
    );
    if (data.status === 201) {
      const user = await data.json();
      return user;
    } else {
      return Promise.reject([]);
    }
  }
}

export default ServiceUser;