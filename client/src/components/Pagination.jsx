/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { Pagination, PaginationItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { useGetTravelsQuery } from '../redux/features/travel/travelApi';

const Paginate = ({ page }) => {
  const { data, refetch } = useGetTravelsQuery(page);

  useEffect(() => {
    if (page) {
      refetch(page);
    }
  }, [page]);

  return (
    <Pagination
      sx={{ justifyContent: 'space-around', margin: '8px' }}
      count={data?.numberOfPages}
      page={Number(page)}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/travels?page=${item.page}`}
        />
      )}
    />
  );
};

export default Paginate;
