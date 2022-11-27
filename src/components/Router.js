import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../routes/Home";
import Auth from "../routes/Auth";
import Profile from "../routes/Profile";
import Navigation from "./Navigation";

const AppRouter = ({ isLoggedIn, userObj, refreshUser }) => {
    return (
        <BrowserRouter>
          {isLoggedIn && <Navigation userObj={userObj}/> }
            <Routes>
                {isLoggedIn ? (
                  <>
                    <Route path="/nwitter" element={<Home userObj={userObj} />} />
                    <Route path="/nwitter/profile" element={<Profile refreshUser={refreshUser} userObj={userObj} />}/>
                  </>
                ): (
                    <Route path="/nwitter" element={<Auth />}></Route>
                )}
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;