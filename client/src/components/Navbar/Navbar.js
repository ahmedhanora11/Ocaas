import React from 'react'
import {Link} from 'react-router-dom'
import { AppBar, Avatar, Toolbar, Typography, Button } from '@material-ui/core';
import useStyles from './styles';
import OCAAS from "../../images/OCAAS.png" //logo

const Navbar = () => {
    const classes = useStyles();
    const user = null;

    return (
        <AppBar className={classes.appBar} position="static" color="inharit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">OCAAS</Typography>
            <img className={classes.image} src={OCAAS} alt="OCAAS" height="62" />
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6"> {user.result.name} </Typography>
                        <Button className={classes.logout} variant="contained" color="secondary"> Logout </Button>
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