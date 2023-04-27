import React, { useEffect, useState } from "react";
import { Container, Grow, Grid, Paper } from "@material-ui/core"
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import useStyles from "./styles"
//Pagination
import Pagination from "../Pagination";

//Dispatch an action hook
import { useDispatch } from "react-redux";
//actions imports
import { getPosts } from '../../actions/posts';

const Home = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const [currentId, setCurrentId] = useState(null);

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);

    return (
        <Grow in>
            <Container>
                <Grid className={classes.mainContainer} container justify="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={7} >
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={4} >
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        <Paper elevation={6}><Pagination /></Paper>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home