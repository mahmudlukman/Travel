import React from 'react';
import { Grid, CircularProgress, Typography } from '@mui/material';
import Travel from './Travel/Travel';
import { useGetTravelsQuery } from '../../redux/features/travel/travelApi';

const Travels = () => {
  const { data, isLoading } = useGetTravelsQuery();

  if (!data || !Array.isArray(data.data) || data.data.length === 0)
    return <Typography>No travels</Typography>;

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid container spacing={3}>
      {data.data.map((travel) => (
        <Grid key={travel._id} item xs={12} sm={6} md={4} lg={3}>
          <Travel travel={travel} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Travels;
