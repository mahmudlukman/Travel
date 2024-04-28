import React from 'react';
import { Grid, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import Travel from './Travel/Travel';

// import Post from './Post/Post';

const Posts = () => {
  // const { posts, isLoading } = useSelector((state) => state.posts);

  // if (!posts.length && !isLoading) return 'No posts';

  // return isLoading ? (
  //   <CircularProgress />
  // ) : (
    <Grid
      sx={{
        borderRadius: 15,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 50px',
      }}
      container
      alignItems="stretch"
      spacing={3}
    >
      <Grid item xs={12} sm={12} md={6} lg={3}>
        <Travel />
      </Grid>
    </Grid>
};

export default Posts;
