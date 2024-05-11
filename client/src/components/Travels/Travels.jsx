// export default Travels;
import React from 'react';
import { Grid, CircularProgress, Typography } from '@mui/material';
import Travel from './Travel/Travel';
import { useGetTravelsQuery } from '../../redux/features/travel/travelApi';

const Travels = ({ setCurrentId, searchResults }) => {
  const { data, isLoading } = useGetTravelsQuery();

  const defaultData = data ? data.data : [];
  const searchResultData = searchResults ? searchResults.data : [];

  const travels = searchResultData.length > 0 ? searchResultData : defaultData;

  if (isLoading) {
    return <CircularProgress />;
  } else if (!travels || travels.length === 0) {
    return <Typography>No travels</Typography>;
  }

  return (
    <Grid container spacing={3}>
      {travels.map((travel) => (
        <Grid key={travel._id} item xs={12} sm={6} md={4} lg={3}>
          <Travel travel={travel} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Travels;
