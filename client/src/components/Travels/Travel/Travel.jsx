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
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useDeleteTravelMutation, useGetTravelsQuery } from '../../../redux/features/travel/travelApi';
import { toast } from 'react-hot-toast';
// import { useHistory } from 'react-router-dom';

// import { likePost, deletePost } from '../../../actions/posts';

const Travel = ({ travel }) => {
  const { user } = useSelector((state) => state.auth);
  const [deleteTravel, { isSuccess, error }] =
    useDeleteTravelMutation();
    const { refetch } = useGetTravelsQuery();
  // const [likes, setLikes] = useState(travel?.likes);
  // const [deleteTravel, { isLoading: deleteLoading, refetch }] = useDeleteTravelMutation();

  // const hasLikedPost = travel.likes.find((like) => like === user._id);

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
  //     return likes.find((like) => like === user._id) ? (
  //       <>
  //         <ThumbUpAlt fontSize="small" />
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

  const handleDelete = async (e) => {
    await deleteTravel(travel._id);
    refetch();
    toast.success('Travel deleted successfully');
  };

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
        sx={{ display: 'block', textAlign: 'initial' }}
      >
        <CardMedia
          sx={{
            height: 0,
            paddingTop: '56.25%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backgroundBlendMode: 'darken',
          }}
          // component="image"
          image={
            travel?.image.url ||
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
        {user?.name === travel?.creator && (
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
              onClick={(e) => {
                e.stopPropagation();
                // setCurrentId(post._id);
              }}
              style={{ color: 'white' }}
              size="small"
            >
              <MoreHoriz fontSize="default" />
            </Button>
          </Box>
        )}
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
        sx={{
          padding: '0 16px 8px 16px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Button
          size="small"
          color="primary"
          disabled={!user}
          // onClick={handleLike}
        >
          {/* <Likes /> */}
        </Button>
        {user?.name === travel?.creator && (
          <Button size="small" color="secondary" onClick={handleDelete}>
            <Delete fontSize="small" /> &nbsp; Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Travel;
