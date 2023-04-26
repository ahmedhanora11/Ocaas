import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Typography, Avatar, Button, Paper, Grid, Container, TextField } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './Input';
import { GoogleLogin } from '@react-oauth/google';
import { useHistory } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { signin, signup } from '../../actions/auth';

import Icon from './Icon';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: ''}
const Auth = () => {
    const classes = useStyles();

    const dispatch = useDispatch();
    
    const [ formData, setFormData ] = useState(initialState);

    const [showPassword, setShowPassword] = useState(false);

    const [isSignup, setIsSignUp] = useState(false);

    //Login or Sign up button using json not google
    const handleSumbit = (e) => {
        e.preventDefault();
        console.log(formData);

        if(isSignup) {
            dispatch(signup(formData, history))
        } else {
            dispatch(signin(formData, history))
        }
    };

    const handleChange = (e) => {
        //targeting the field to update like firstName, and password
        setFormData({ ...formData, [e.target.name]: e.target.value})
    };

    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
        setShowPassword(false);
    };

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    
    const googleSuccess = async (res) => {
        const token = res?.credential;
        const result = jwt_decode(token);


        try {
            dispatch({ type: 'AUTH', data: { result, token } });
            // push user to the main page after signing using google
            history.push('/');
        } catch (error) {
            console.log(error);
        }
    };

    const googleFailure = () => {
        console.log('Hi mate, Google Sign In Error');
    };

    const history = useHistory();

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5'>
                    {isSignup ? 'Sign Up' : 'Sign In'}
                </Typography>
                <form className={classes.form} onSubmit={handleSumbit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name='firstName' label='First Name:' handleChange={handleChange} autoFocus half />
                                    <Input name='lastName' label='Last Name:' handleChange={handleChange} half />
                                </>
                            )}
                        <Input name='email' label='Email Address:' handleChange={handleChange} type='email' />
                        <Input name='password' label='Password:' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        {isSignup && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password' />}
                    </Grid>

                    <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>

                    <GoogleLogin

                        render={(renderProps) => (
                            <Button
                                className={classes.googleButton}
                                color='primary'
                                fullWidth
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                startIcon={<Icon />}
                                variant='contained'
                            >
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        
                        cookiePolicy='single_host_origin'
                    />

                    <Grid container justifyContent='flex-end'>
                        <Grid item>
                            <Button onClick={switchMode} >
                                {isSignup ? 'Got account? Sign In' : 'New user? Sign Up'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth