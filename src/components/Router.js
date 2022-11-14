import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../routes/Home";
import Auth from "../routes/Auth";
import Profile from "../routes/Profile";
import Navigation from "./Navigation";

const AppRouter = ({ isLoggedIn}) => {
    return (
        <BrowserRouter>
          {isLoggedIn && <Navigation /> }
            <Routes>
                {isLoggedIn ? (
                  <>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<Profile />}/>
                  </>
                ): (
                    <Route path="/" element={<Auth />}></Route>
                )}
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;