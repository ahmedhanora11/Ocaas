import React, {useState} from "react";
import useStyles from "./styles"
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';

import { likePost, deletePost } from '../../../actions/posts';

const Post = ({ post, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const history = useHistory();
    const [likes, setLikes] = useState(post?.likes);

    const handleLike = async () => {
        dispatch(likePost(post._id));
        
    };

    const Likes = () => {
        if (post.likes.length > 0){
            return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
                ? (
                    <><ThumbUpAltIcon fontSize="small" /> &nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
                ) : (
                    <><ThumbUpAltIcon fontSize="small" />  &nbsp;{post.likes.length} {post.likes.length === 1 ? 'like' : 'likes'} </>
                );
        }

        return <><ThumbUpAltIcon fontSize="small" />&nbsp;Like </>;
    }

    const openPost = () => history.push(`/posts/${post._id}`);

    return (
        <Card className={classes.card} raised elevation={6}>
            
            <ButtonBase className={classes.cardAction} onClick={openPost}>

            <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
            <div className={classes.overlay}>
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            </ButtonBase>
            {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator || user?.result?._id === '64491937b8afcaa9255eceb5' || user?.result?._id === '64819b6bec953d4d871bef5e') && (
            <div className={classes.overlay2}>
                <Button style={{ color: 'white' }} size="small" 
                onClick={() => setCurrentId(post._id)}><MoreHorizIcon fontSize="default" /></Button>
            </div>
            )}
            <ButtonBase className={classes.cardAction} onClick={openPost}>
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
            <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
                <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
                </CardContent>

            </ButtonBase>
            
            
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" disabled={!user?.result} onClick={handleLike}>
                    <Likes />
                </Button>

                {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator || user?.result?._id === '64491937b8afcaa9255eceb5' || user?.result?._id === '64819b6bec953d4d871bef5e') && (
                <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}><DeleteIcon fontSize="small" /> Delete</Button>
                )}
            
            
            </CardActions>

            
        </Card>
    )
}

export default Post;