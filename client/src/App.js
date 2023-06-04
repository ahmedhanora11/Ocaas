import React from "react";
import { Container } from "@material-ui/core"

import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import dotenv from 'dotenv';
import { GoogleOAuthProvider } from '@react-oauth/google';

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";
import Kommunicate from "@kommunicate/kommunicate-chatbot-plugin";

import { FloatButton, Tooltip, Button, Space } from "antd";
import Icon, { BorderOutlined } from '@ant-design/icons';
import { CommentOutlined } from '@ant-design/icons';
import OCAAS from "./images/OCAAS2.gif" //logo
import OcaasChat from "./components/Chatbot/chat";


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

        {/* Ocaas chatbot */}
        <Container>
            <OcaasChat/>
        </Container>
        
        {/* <Container>
        
        <Tooltip title="I 'm Here to help!">
        <Button 
        style={{ height:'90px', width:'90px', margin:"10px 60px 50px 0", backgroundColor:'#000000' ,color: '#000000', float: 'right', position:'fixed', bottom:'0px', right:'0px'}}
        icon={<img src={OCAAS} height={75} style={{ height:'87px', width:'87px', margin:"10px 61px 51px 0", float: 'right', position:'fixed', bottom:'0px', right:'0px'}} />}
        shape="circle"
        
        >
            
        </Button>
        </Tooltip>

        <Container         style={{ margin:"10px -820px -32px 0px", color: '#000000', float: 'right', position:'fixed', bottom:'0px', right:'0px'}}>
        <iframe height="600" width="400" src="https://widget.kommunicate.io/chat?appId=16dab34453b490b08ed7ec842b144c9eb" allow="microphone; geolocation;"></iframe>
        </Container>
     
        </Container> */}

        
        
        </GoogleOAuthProvider>
        
    );
}

export default App;
