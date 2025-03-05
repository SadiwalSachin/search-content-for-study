import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./Pages/Home";
import AISerach from "./Pages/AISearch";
import FindPlaylist from "./Pages/FindPlaylist";
import ViewAllPyq from "./Pages/ViewAllPyq";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoute";
import UserProfile from "./Pages/UserProfile";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setAccessToken, setIsLoggedIn } from "./redux/Slices/authSlice";
import UserDetails from "./components/UserDetails";
import EditProfile from "./components/EditProfile";
import UserLogin from "./Pages/UserLogin";
import UserSignUp from "./Pages/UserSignUp";
import Connect from "./Pages/Connect";

function App() {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.userAuth);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      dispatch(setAccessToken(token));
      dispatch(setIsLoggedIn(true));
    }
  }, [dispatch, userState]);

  return (
    <>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignUp/>} />
        <Route
          path="/aiserach"
          element={<ProtectedRoute component={<AISerach />} />}
        />
        <Route
          path="/findplaylist"
          element={<ProtectedRoute component={<FindPlaylist />} />}
        />
        <Route
          path="/viewallpyq"
          element={<ProtectedRoute component={<ViewAllPyq />} />}
        />
        <Route
          path="/userprofile"
          element={<ProtectedRoute component={<UserProfile />} />}
        />
        <Route
          path="/userdetails"
          element={<ProtectedRoute component={<UserDetails />} />}
        />
        <Route
          path="/userdetails/editprofile"
          element={<ProtectedRoute component={<EditProfile />} />}
        />
        <Route
          path="/updatepassword"
          element={<ProtectedRoute component={<EditProfile />} />}
        />
        <Route path="/connect" element={<Connect/>}/>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
