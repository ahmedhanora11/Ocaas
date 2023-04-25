import React, { useState } from 'react'
import { Typography, Avatar, Button, Paper, Grid, Container, TextField } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './Input';
import { GoogleLogin } from 'react-google-login';
import Icon from './Icon';
const Auth = () => {
    const classes = useStyles();

    const [showPassword, setShowPassword] = useState(false);

    const [isSignup, setIsSignUp] = useState(false);

    const handleSumbit = () => {

    };

    const handleChange = () => {

    };

    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
        handleShowPassword(false);
    };

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const googleSuccess = (res) => {
        console.log(res);
    };

    const googleFailure = () => {
        console.log('Hi mate, Google Sign In Error');
    };

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
                    <GoogleLogin
                        clientId='Google ID'
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
                    <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
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