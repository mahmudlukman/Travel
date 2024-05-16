import React, { useEffect } from 'react';
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
  useTheme,
  Box,
  Card,
  CardMedia,
  CardContent,
} from '@mui/material';
import moment from 'moment';
import { useParams, Link, useNavigate } from 'react-router-dom';
import CommentSection from './CommentSection';
import {
  useGetTravelQuery,
  useGetTravelBySearchQuery,
  useGetTravelsQuery,
} from '../../redux/features/travel/travelApi';

const Post = () => {
  const theme = useTheme();
  const { id } = useParams();
  const { data: travel, isLoading, isError, refetch } = useGetTravelQuery(id);
  const { refetch: refetchSearch } = useGetTravelBySearchQuery();
  const { data: travels } = useGetTravelsQuery();
  const navigate = useNavigate();

  useEffect(() => {
    refetch(id);
    refetchSearch({ search: 'none', tags: travel?.data?.tags.join(',') });
  }, [id, travel, refetch, refetchSearch]);

  if (!travel) return null;

  const openPost = (_id) => navigate(`/travels/${_id}`);

  if (isLoading) {
    return (
      <Paper
        elevation={6}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          borderRadius: '15px',
          height: '39vh',
        }}
      >
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  const recommendedPosts = travels?.data?.filter((post) => {
    const isSimilarTag = post.tags.some((tag) =>
      travel.data.tags.includes(tag)
    );

    return post._id !== id && isSimilarTag;
  });

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          [theme.breakpoints.down('sm')]: {
            flexWrap: 'wrap',
            flexDirection: 'column',
          },
        }}
      >
        <Box sx={{ borderRadius: '20px', margin: '10px', flex: 1 }}>
          <Typography variant="h3" component="h2">
            {travel?.data?.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {travel?.data?.tags.map((tag) => (
              <Link
                to={`/tags/${tag}`}
                style={{ textDecoration: 'none', color: '#3f51b5' }}
              >
                {` #${tag} `}
              </Link>
            ))}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {travel?.data?.message}
          </Typography>
          <Typography variant="h6">
            Created by:{' '}
            <Link
              to={`/creators/`}
              style={{ textDecoration: 'none', color: '#3f51b5' }}
            >
              {travel?.data?.name}
            </Link>
          </Typography>
          <Typography variant="body1">
            {moment(travel?.data?.createdAt).fromNow()}
          </Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1">
            <strong>Realtime Chat - coming soon!</strong>
          </Typography>
          <Divider style={{ margin: '20px 0' }} />
          <CommentSection travel={travel.data} />
          <Divider style={{ margin: '20px 0' }} />
        </Box>
        <Box
          sx={{
            flex: 1,
            marginLeft: '0px',
            [theme.breakpoints.down('sm')]: {
              marginLeft: 0,
            },
          }}
        >
          <img
            style={{
              borderRadius: '20px',
              objectFit: 'cover',
              width: '100%',
              maxHeight: '600px',
            }}
            src={
              travel?.data?.image.url ||
              'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
            }
            alt="post.title"
          />
        </Box>
      </Box>
      {!!recommendedPosts.length && (
        <Box sx={{ borderRadius: '20px', margin: '10px', flex: 1 }}>
          <Typography gutterBottom variant="h5">
            You might also like:
          </Typography>
          <Divider />
          <Box
            sx={{
              display: 'flex',
              [theme.breakpoints.down('sm')]: {
                flexDirection: 'column',
              },
            }}
          >
            {recommendedPosts.map(
              ({ title, name, message, likes, image, _id }) => (
                <Card
                  key={_id}
                  onClick={() => openPost(_id)}
                  sx={{
                    display: 'flex',
                    width: '30%',
                    margin: '10px 10px',
                    cursor: 'pointer',
                    [theme.breakpoints.down('sm')]: {
                      display: 'block',
                      margin: '20px 0',
                      width: '100%',
                      justifyContent: 'center',
                    },
                  }}
                  
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent
                      sx={{
                        flex: '1 0 auto',
                        [theme.breakpoints.down('sm')]: {
                          flex: 'auto',
                        },
                      }}
                    >
                      <Typography component="div" variant="h5">
                        {title}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                      >
                        {name}
                      </Typography>
                    </CardContent>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        pl: 1,
                        pb: 1,
                      }}
                    >
                      <Typography
                        component="div"
                        variant="p"
                        sx={{ padding: '10px' }}
                      >
                        {message.split(' ').splice(0, 20).join(' ')}...
                      </Typography>
                    </Box>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                      sx={{ padding: '5px 20px' }}
                    >
                      Likes: {likes.length}
                    </Typography>
                  </Box>
                  <CardMedia
                    component="img"
                    sx={{
                      width: 151,
                      [theme.breakpoints.down('sm')]: {
                        width: '100%',
                      },
                    }}
                    image={
                      image.url ||
                      'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
                    }
                    alt="Live from space album cover"
                  />
                </Card>
              )
            )}
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default Post;
