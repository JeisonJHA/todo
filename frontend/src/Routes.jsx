import React from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import Main from "./pages/Main";
import SignIn from "./components/Signin";
import SignUp from "./components/Signup";

const Router = () => {
  const auth = useSelector((state) => state.auth);
  return (
    <Routes>
      <Route path="/" element={auth.logged ? <Main /> : <SignIn />} />
      <Route path="/signup" element={auth.logged ? <Main /> : <SignUp />} />
      <Route path="/app" element={auth.logged ? <Main /> : <SignIn />} />
      <Route path="*" element={<h1>Page not found</h1>} />
    </Routes>
  );
};

export default Router;
