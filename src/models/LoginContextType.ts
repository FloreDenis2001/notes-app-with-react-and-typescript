import UserLogin from "./UserLogin";

type LoginContextType = {
    user: UserLogin;
    setUserCookie: (user: UserLogin) => void;
    logOut:()=>void;
};

export default LoginContextType;