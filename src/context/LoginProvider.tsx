import React, { useEffect, useState } from "react";
import UserLogin from "../models/UserLogin";
import LoginContextType from "../models/LoginContextType";
import Cookies from "js-cookie";

type LoginContextProps = {
  children?: React.ReactNode;
};

export const LoginContext = React.createContext<LoginContextType | null>(null);

const LoginProvider: React.FC<LoginContextProps> = ({ children }) => {
  const [user, setUser] = useState<UserLogin>({
    id: 0,
    email: "NOEMAIL",
    username: "NOUSERNAME",
    token: "NOTOKEN",
  });

  useEffect(() => {
    const authedUser = Cookies.get("authedUser");
    if (authedUser) {
      setUser(JSON.parse(authedUser) as UserLogin);
    }
  }, []);

  function setUserCookie(user: UserLogin) {
    Cookies.set("authedUser", JSON.stringify(user), { expires: 1 });
    setUser(user);
  }

  function logOut() {
    Cookies.remove("authedUser");
    setUser({
      id: 0,
      email: "NOEMAIL",
      username: "NOUSERNAME",
      token: "NOTOKEN",
    });
  }

  return (
    <LoginContext.Provider value={{ user, setUserCookie, logOut }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;
