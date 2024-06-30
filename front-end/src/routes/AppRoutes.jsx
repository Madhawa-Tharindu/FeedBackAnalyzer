import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Analyzer from "../pages/Analyzer";
import SentimentScore from "../pages/SentimentScore";
import Home from "../pages/Home";
import UserProfile from "../pages/UserProfile";
import UserLoginForm from "../components/UserLoginForm";
import UserSignUpForm from "../components/UserSignUpForm";
import UserForgetPasswordForm from "../components/UserForgetPasswordForm";
import DefaultLayout from "../layout/DefaultLayout";
import AuthLayout from "../layout/AuthLayout";
import Cookies from "js-cookie";

export default function AppRoutes() {
  const checkAccessToken = () => {
    // Check if the access token is present in the cookie
    const accessToken = Cookies.get("accessToken");
    return accessToken ? true : false;
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            checkAccessToken() ? (
              <DefaultLayout component={<Home />} />
            ) : (
              <Navigate to="/signin" />
            )
          }
        />
        <Route
          path="/signin"
          element={<AuthLayout component={<UserLoginForm />} />}
        />
        {/* <Route
          path="/forgetpass"
          element={<AuthLayout component={<UserForgetPasswordForm />} />}
        /> */}
        <Route
          path="/signup"
          element={<AuthLayout component={<UserSignUpForm />} />}
        />
        <Route
          path="/dashboard"
          element={
            checkAccessToken() ? (
              <DefaultLayout component={<SentimentScore />} />
            ) : (
              <Navigate to="/signin" />
            )
          }
        />
        <Route
          path="/analyzer"
          element={
            checkAccessToken() ? (
              <DefaultLayout component={<Analyzer />} />
            ) : (
              <Navigate to="/signin" />
            )
          }
        />
        <Route
          path="/user-profile"
          element={
            checkAccessToken() ? (
              <DefaultLayout component={<UserProfile />} />
            ) : (
              <Navigate to="/signin" />
            )
          }
        />
      </Routes>
    </Router>
  );
}
