import { Redirect } from "react-router-dom";

const CheckLogin = ({ children }) => {
  const isLogin = JSON.parse(localStorage.getItem("isLogin"));
  if (!isLogin) {
    return <Redirect to="/login" />;
  } else {
    return children;
  }
};

export default CheckLogin;
