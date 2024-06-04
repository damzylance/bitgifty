import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import ConfirmEmail from "../Pages/Signup/ConfirmEmail";
import Dashboard from "../Pages/Dashboard";
import Wallet from "../Pages/Dashboard/Wallet";
import Reset from "../Pages/Reset/Reset";
import PasswordResetConFirm from "../Pages/ChangePassword/ChangePassword";
import Create from "../Pages/Dashboard/Giftcard/Create";
import CoinDetails from "../Pages/Dashboard/Wallet/Wallet";
import Home from "../Pages";
import Notfound from "../Pages/404";
import ContactUs from "../Pages/Contact";
import Payout from "../Pages/UserSetting/Payout";
import SwapHistory from "../Pages/Dashboard/Wallet/SwapHistory";
import FiatHistory from "../Pages/Dashboard/Wallet/FiatHistory";
import Privacy from "../Pages/Privacy";
import Utility from "../Pages/Dashboard/Utility";
import Reedeem from "../Pages/Dashboard/Giftcard/Reedeem";
import MyCards from "../Pages/Dashboard/Giftcard/MyCards";
import SettingsLayout from "../Pages/UserSetting/SettingsLayout";
import Aml from "../Pages/Aml";
import TermsAndConditions from "../Pages/Terms/TermsAndConditions";
function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/contact-us" element={<ContactUs />} />
        <Route exact path="/privacy-policy" element={<Privacy />} />
        <Route exact path="/aml" element={<Aml/>} />
        <Route exact path="/tnc" element={<TermsAndConditions/>} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Signup />} />
        <Route exact path="/register/:referral_code" element={<Signup />} />

        <Route
          exact
          path="/auth/email-confirm/:token"
          element={<ConfirmEmail />}
        />
        <Route exact path="/password-reset" element={<Reset />} />
        <Route
          exact
          path="/auth/password/password-reset-confirm/:uid/:token"
          element={<PasswordResetConFirm />}
        />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/giftcard/cards" element={<MyCards />} />
        <Route exact path="/giftcard/create" element={<Create />} />
        <Route exact path="/giftcard/redeem" element={<Reedeem />} />
        <Route exact path="/wallet" element={<Wallet />} />
        <Route exact path="/utilities" element={<Utility />} />
        <Route exact path="/transaction-history/" element={<CoinDetails />} />
        <Route exact path="/transaction-history/:currency" element={<CoinDetails />} />
        <Route exact path="/swap-history" element={<SwapHistory />} />
        <Route exact path="/fiat-history" element={<FiatHistory />} />
        <Route exact path="/setting" element={<SettingsLayout />} />
        <Route exact path="/setting/payout" element={<Payout />} />
        <Route path="/*" element={<Notfound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
