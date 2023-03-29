import React, { useEffect } from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core"
//Dispatch an action hook
import { useDispatch } from "react-redux";
//actions imports
import { getPosts } from './actions/posts';

import OCAAS from "./images/OCAAS.png" //logo
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import useStyles from "./styles"

const App = () => {

    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    return (
        
        <Container maxWidth= "lg">
            <AppBar className={classes.appBar} position="static" color="inharit">
                <img className={classes.image} src={OCAAS} alt="OCAAS" height="62"/>
                <Typography className={classes.heading} variant="h2" align="center">
                    OCAAS
                </Typography>
            </AppBar>
            <Grow in>
                <Container>
                    <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7} >
                            <Posts />
                        </Grid>
                        <Grid item xs={12} sm={4} >
                            <Form />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>

    );
}

export default App;
