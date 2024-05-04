import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core/';
import { useDispatch } from 'react-redux';

const CommentSection = ({ travel }) => {
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
    <div>
      <div sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <div sx={{ height: '200px', overflowY: 'auto', marginRight: '30px' }}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          <Typography gutterBottom variant="subtitle1">
            <strong>Comment</strong>
            Comment
          </Typography>
          <div ref={commentsRef} />
        </div>
        <div style={{ width: '70%' }}>
          <Typography gutterBottom variant="h6">
            Write a comment
          </Typography>
          <TextField
            fullWidth
            rows={4}
            variant="outlined"
            label="Comment"
            onChange={() => {}}
          />
          <br />
          <Button
            style={{ marginTop: '10px' }}
            fullWidth
            color="primary"
            variant="contained"
          >
            Comment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
