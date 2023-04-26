import React from "react";
import { Container } from "@material-ui/core"

import { Switch, Route, BrowserRouter } from "react-router-dom";
import dotenv from 'dotenv';
import { GoogleOAuthProvider } from '@react-oauth/google';

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

const App = () => {
    return (
        <GoogleOAuthProvider clientId= "413738397596-6ukb2qqm27dquf9mv1s0n8kjej7af6ml.apps.googleusercontent.com" >
        <BrowserRouter>
        <Container maxWidth= "lg" >
            <Navbar />
            <Switch>
                <Route path="/" exact component={Home} /> {/* Home Path */}
                <Route path="/auth" exact component={Auth} /> {/* Auth Path */}
            </Switch>
        </Container>
        </BrowserRouter>
        </GoogleOAuthProvider>
    );
}

export default App;
