import React,{ useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import { AppBar, Avatar, Toolbar, Typography, Button } from '@material-ui/core';
import useStyles from './styles';
import OCAAS from "../../images/OCAAS.gif" //logo
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import decode from 'jwt-decode';

const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile'))); //ok
    console.log(user);

    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: 'LOGOUT'});

        history.push('/');

        setUser(null);
    };

    useEffect(() => {
        const token = user?.token;

        //jwt
        if(token) {
            const decodedToken = decode(token);

            if(decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    return (
        <AppBar className={classes.appBar} position="static" color="inharit">
            <div className={classes.brandContainer}>
                
            <img className={classes.image} src={OCAAS} alt="OCAAS"  />
            <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">OCAAS</Typography>
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6"> {user.result.name} </Typography>
                        <Button className={classes.logout} variant="contained" color="secondary" onClick={logout}> Logout </Button>
                    </div>
                ) : (
                    <div>
                        <Button component={Link} to="/auth" variant="contained" color='primary'> Sign In </Button>
                    </div>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar