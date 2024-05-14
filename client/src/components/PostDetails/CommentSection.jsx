import React, { useState, useRef } from 'react';
import { Typography, TextField, Button, Box } from '@mui/material';
import { useDispatch } from 'react-redux';

const CommentSection = ({ post }) => {
  // const user = JSON.parse(localStorage.getItem('profile'));
  // const [comment, setComment] = useState('');
  // const dispatch = useDispatch();
  // const [comments, setComments] = useState(post?.comments);
  // const classes = useStyles();
  // const commentsRef = useRef();

  // const handleComment = async () => {
  //   const newComments = await dispatch(commentPost(`${user?.result?.name}: ${comment}`, post._id));

  //   setComment('');
  //   setComments(newComments);

  //   commentsRef.current.scrollIntoView({ behavior: 'smooth' });
  // };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ height: '200px', overflowY: 'auto', marginRight: '30px' }}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          <Typography gutterBottom variant="subtitle1">
            <strong>Comm: </strong>
            Coming Soon
          </Typography>
          {/* <div ref={commentsRef} /> */}
        </Box>
      </Box>
      <Box sx={{ width: '70%' }}>
        <Typography gutterBottom variant="h6">
          Write a comment
        </Typography>
        <TextField sx={{width: '100%'}} rows={4} variant="outlined" label="Comment" />
        <br />
        <Button
          style={{ marginTop: '10px' }}
          color="primary"
          variant="contained"
        >
          Comment
        </Button>
      </Box>
    </Box>
  );
};

export default CommentSection;
