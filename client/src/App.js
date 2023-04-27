import React from "react";
import { Container } from "@material-ui/core"

import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import dotenv from 'dotenv';
import { GoogleOAuthProvider } from '@react-oauth/google';

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";

const App = () => {

    const user = JSON.parse(localStorage.getItem('profile'));
    return (
        <GoogleOAuthProvider clientId= "413738397596-6ukb2qqm27dquf9mv1s0n8kjej7af6ml.apps.googleusercontent.com" >
        <BrowserRouter>
        <Container maxWidth= "xl" >
            <Navbar />
            <Switch>
                <Route path="/" exact component={() => <Redirect to="/posts" />} /> {/* Home Path */}
                <Route path="/posts" exact component={Home} />
                <Route path="/posts/search" exact component={Home} />
                <Route path="/posts/:id" component={PostDetails} />
                <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/posts" />)} /> {/* Auth Path */}
            </Switch>
        </Container>
        </BrowserRouter>
        </GoogleOAuthProvider>
    );
}

export default App;
