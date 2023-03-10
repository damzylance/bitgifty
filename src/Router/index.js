import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import UserSetting from "../Pages/UserSetting";
import Dashboard from "../Pages/Dashboard";
import Giftcard from "../Pages/Dashboard/Giftcard";
import Wallet from "../Pages/Dashboard/Wallet";
import History from "../Pages/Dashboard/History";
import Reset from "../Pages/Reset/Reset";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Signup />} />
        <Route exact path="/password-reset" element={<Reset />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/giftcard" element={<Giftcard />} />
        <Route exact path="/wallet" element={<Wallet />} />
        <Route exact path="/history" element={<History />} />
        <Route exact path="/history" element={<History />} />
        <Route exact path="/setting" element={<UserSetting />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
