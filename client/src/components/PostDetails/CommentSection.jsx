import React, { useState, useRef } from 'react';
import { Typography, TextField, Button, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { useCommentTravelMutation, useGetTravelQuery } from '../../redux/features/travel/travelApi';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const CommentSection = ({ travel }) => {
  const { user } = useSelector((state) => state.auth);
  const [comment, setComment] = useState('');
  const [commentTravel, { isLoading, isSuccess, error }] =
    useCommentTravelMutation();
    const { id } = useParams();
  const { data, refetch } = useGetTravelQuery(id);
  const [comments, setComments] = useState(travel?.comments ?? []);
  const commentsRef = useRef();

  useEffect(() => {
    setComments(travel?.comments ?? []);
  }, [travel]);

  const handleComment = async () => {
    const newComments = await commentTravel({
      value: `${user?.name}: ${comment}`,
      id: travel._id,
    });

    setComment('');
    setComments(newComments);
    commentsRef.current.scrollIntoView({ behavior: 'smooth' });
    refetch(id)
    toast.success('Comment Submitted successfully');
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ height: '200px', overflowY: 'auto', marginRight: '30px' }}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {Array.isArray(comments) && comments?.map((c, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              <strong>{c.split(': ')[0]}</strong>
              {c.split(':')[1]}
              {/* Comment {i} */}
            </Typography>
          ))}
          <div ref={commentsRef} />
        </Box>
      </Box>
      {user?.name && (
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
      )}
    </Box>
  );
};

export default CommentSection;
