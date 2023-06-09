import React, {useState, useEffect} from "react";
import useStyles from "./styles";
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost, getPostsBySearch } from "../../actions/posts";
import { useHistory } from "react-router-dom";

const Form = ({currentId, setCurrentId}) => {
    //post data information types
    const [postData, setPostData] = useState({
         title: '', message: '', tags: '', selectedFile: ''
    });

    const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null));

    const dispatch = useDispatch();

    const classes = useStyles();

    const user = JSON.parse(localStorage.getItem('profile'));

    const history = useHistory();

    useEffect(() => {
        if (post) setPostData(post);
      }, [post]);
    
    //handle submit
    const handleSubmit = (e) => {
        e.preventDefault();

        if(currentId){
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
            history.push('/')

        } else {
            dispatch(createPost({ ...postData, name: user?.result?.name }));
            history.push('/posts')
        }
        clear();
        
    };


    

    const clear = () => {
        setCurrentId(null);
        setPostData({ title: '', message: '', tags: '', selectedFile: ''})
    };

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign in to be able to ask and publish questions.
                </Typography>

            </Paper>
        );
    }

    return (
        <Paper elevation={6} className={classes.paper}>
            <form className={`${classes.root} ${classes.form}`} noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Typography variant="h5">
                    {currentId ? 'Edit' : 'Create'} a post
                </Typography>
                
                <TextField name="title" label="Title" fullWidth variant="outlined" value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })}/>
                <TextField name="message" label="Question?" fullWidth variant="outlined" value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })}/>
                <TextField name="tags" label="Tags" fullWidth variant="outlined" value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}/>
                <div className={classes.fileInput}>
                    <FileBase 
                        type="false"
                        multiple={false}
                        onDone={({base64}) => setPostData({ ...postData, selectedFile: base64 })}
                    />
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth> Submit </Button>
                <Button  variant="contained" color="secondary" size="small" onClick={clear} fullWidth> Clear </Button>
            </form>

        </Paper>
    )
}

export default Form;