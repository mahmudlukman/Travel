/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, PaginationItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { useGetTravelsQuery } from '../redux/features/travel/travelApi';

// import { getPosts } from '../actions/posts';

const Paginate = ({ page }) => {
  const { data, refetch } = useGetTravelsQuery();
  // const { numberOfPages } = useSelector((state) => state.posts);
  // const dispatch = useDispatch();

  useEffect(() => {
    if (page) {
      refetch(page);
    }
  }, [page]);

  return (
    <Pagination
      sx={{ justifyContent: 'space-around', margin: '8px' }}
      count={3}
      page={10}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/posts?page=${item.page}`}
        />
      )}
    />
  );
};

export default Paginate;
