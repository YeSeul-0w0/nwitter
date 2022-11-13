import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../routes/Home";
import Auth from "../routes/Auth";

const AppRouter = ({ isLoggedIn}) => {
    return (
        <BrowserRouter>
            <Routes>
                {isLoggedIn ? (
                    <Route path="/" element={<Home />}></Route>
                ): (
                    <Route path="/" element={<Auth />}></Route>
                )}
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;