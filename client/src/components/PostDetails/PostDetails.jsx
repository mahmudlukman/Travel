import React, { useEffect } from 'react';
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
  useTheme,
  Box,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, Link, useNavigate } from 'react-router-dom';
import CommentSection from './CommentSection';
import { useGetTravelQuery } from '../../redux/features/travel/travelApi';

const Post = () => {
  const theme = useTheme();
  const { id } = useParams();
  const { data: travel, isLoading, isError, refetch } = useGetTravelQuery(id);
  const navigate = useNavigate();
  // const { post, posts, isLoading } = useSelector((state) => state.posts);
  // const dispatch = useDispatch();
  // const history = useHistory();
  // const classes = useStyles();

  useEffect(() => {
    refetch(id);
  }, [id]);

  console.log(travel);

  // useEffect(() => {
  //   if (post) {
  //     dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));
  //   }
  // }, [post]);

  // if (!post) return null;

  // const openPost = (_id) => history.push(`/posts/${_id}`);

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

  // const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

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
          <CommentSection />
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
          <Box
            style={{ margin: '20px', cursor: 'pointer' }}
            onClick={() => {}}
            // key={_id}
          >
            <Typography gutterBottom variant="h6">
              title
            </Typography>
            <Typography gutterBottom variant="subtitle2">
              name
            </Typography>
            <Typography gutterBottom variant="subtitle2">
              message
            </Typography>
            <Typography gutterBottom variant="subtitle1">
              Likes:
            </Typography>
            <img
              src={
                'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
              }
              width="200px"
            />
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default Post;
