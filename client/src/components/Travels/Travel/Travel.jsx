import React, { useState } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
  Box,
} from '@mui/material';
import {
  ThumbUpAlt,
  Delete,
  MoreHoriz,
  ThumbUpAltOutlined,
} from '@mui/icons-material';
// import { useDispatch } from 'react-redux';
import moment from 'moment';
// import { useHistory } from 'react-router-dom';

// import { likePost, deletePost } from '../../../actions/posts';

const Travel = ({ travel }) => {

  // const user = JSON.parse(localStorage.getItem('profile'));
  // const [likes, setLikes] = useState(post?.likes);

  // const hasLikedPost = post.likes.find((like) => like === userId);

  // const handleLike = async () => {
  //   dispatch(likePost(post._id));

  //   if (hasLikedPost) {
  //     setLikes(post.likes.filter((id) => id !== userId));
  //   } else {
  //     setLikes([...post.likes, userId]);
  //   }
  // };

  // const Likes = () => {
  //   if (likes.length > 0) {
  //     return likes.find((like) => like === userId) ? (
  //       <>
  //         <ThumbUpAltIcon fontSize="small" />
  //         &nbsp;
  //         {likes.length > 2
  //           ? `You and ${likes.length - 1} others`
  //           : `${likes.length} like${likes.length > 1 ? 's' : ''}`}
  //       </>
  //     ) : (
  //       <>
  //         <ThumbUpAltOutlined fontSize="small" />
  //         &nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}
  //       </>
  //     );
  //   }

  //   return (
  //     <>
  //       <ThumbUpAltOutlined fontSize="small" />
  //       &nbsp;Like
  //     </>
  //   );
  // };

  // const openPost = (e) => {
  //   // dispatch(getPost(post._id, history));

  //   history.push(`/posts/${post._id}`);
  // };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '15px',
        height: '100%',
        position: 'relative',
      }}
      raised
      elevation={6}
    >
      <ButtonBase
        component="span"
        name="test"
        sx={{
          padding: '0 16px 8px 16px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
        // onClick={openPost}
      >
        <CardMedia
          sx={{
            height: 0,
            paddingTop: '56.25%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backgroundBlendMode: 'darken',
          }}
          image={
            travel?.image?.url ||
            'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
          }
          title={travel.title}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            color: 'white',
          }}
        >
          <Typography variant="h6">{travel.name}</Typography>
          <Typography variant="body2">
            {moment(travel.createdAt).fromNow()}
          </Typography>
        </Box>
        <Box
          sx={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            color: 'white',
          }}
          name="edit"
        >
          <Button
            // onClick={(e) => {
            //   e.stopPropagation();
            //   setCurrentId(post._id);
            // }}
            style={{ color: 'white' }}
            size="small"
          >
            <MoreHoriz fontSize="default" />
          </Button>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: '20px',
          }}
        >
          <Typography variant="body2" color="textSecondary" component="h2">
            {travel.tags.map((tag) => `#${tag} `)}
          </Typography>
        </Box>
        <Typography
          sx={{ padding: '0 16px' }}
          gutterBottom
          variant="h5"
          component="h2"
        >
          {travel.title}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {travel.message.split(' ').splice(0, 20).join(' ')}...
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions
        as={{
          padding: '0 16px 8px 16px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Button
          size="small"
          color="primary"
          // disabled={!user?.result}
          // onClick={handleLike}
        >
          {/* <Likes /> */}
        </Button>
        <Button
          size="small"
          color="secondary"
          // onClick={() => dispatch(deletePost(post._id))}
        >
          <Delete fontSize="small" /> &nbsp; Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Travel;
