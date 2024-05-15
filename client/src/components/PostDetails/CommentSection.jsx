import React, { useState, useRef } from 'react';
import { Typography, TextField, Button, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {useCommentTravelMutation} from '../../redux/features/travel/travelApi'

const CommentSection = ({ travel }) => {
  const { user } = useSelector((state) => state.auth);
  const [comment, setComment] = useState('');
  // const [comments, setComments] = useState([1, 2, 3, 4]);
  const [commentTravel, { isLoading, isSuccess, error }] = useCommentTravelMutation()
  const [comments, setComments] = useState(travel?.comments);
  const commentsRef = useRef();

  const handleComment = async () => {
    const newComments = await commentTravel(`${user?.name}: ${comment}`, travel._id);

    setComment('');
    setComments(newComments);

    commentsRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ height: '200px', overflowY: 'auto', marginRight: '30px' }}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {comments?.map((c, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              {/* <strong>{c.split(': ')[0]}</strong>
              {c.split(':')[1]} */}
              Comment {i}
            </Typography>
          ))}
          {/* <div ref={commentsRef} /> */}
        </Box>
      </Box>
      <Box sx={{ width: '70%' }}>
        <Typography gutterBottom variant="h6">
          Write a comment
        </Typography>
        <TextField
          sx={{ width: '100%' }}
          rows={4}
          variant="outlined"
          label="Comment"
          multiline
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <br />
        <Button
          style={{ marginTop: '10px', width: '100%' }}
          color="primary"
          variant="contained"
          disabled={!comment.length}
          onClick={handleComment}
        >
          Comment
        </Button>
      </Box>
    </Box>
  );
};

export default CommentSection;
