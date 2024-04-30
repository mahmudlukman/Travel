// import React from 'react';
// import { Grid, CircularProgress, Typography } from '@mui/material';
// import Travel from './Travel/Travel';
// import { useGetTravelsQuery } from '../../redux/features/travel/travelApi';

// const Travels = () => {
//   // const { posts, isLoading } = useSelector((state) => state.posts);
//   const { data, isLoading } = useGetTravelsQuery();
//   // console.log(data.data[0].message)
//   if (!data || !Array.isArray(data.data) || data.length === 0)
//     return <Typography>No travels</Typography>;

//   return isLoading ? (
//     <CircularProgress />
//   ) : (
//     <Grid
//       sx={{
//         borderRadius: 15,
//         margin: '30px 0',
//         display: 'flex',
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         padding: '10px 50px',
//       }}
//       container
//       alignItems="stretch"
//       spacing={3}
//     >
//       {Array.isArray(data) && data.map((travel) => (
//         <Grid key={travel._id} item xs={12} sm={12} md={6} lg={3}>
//           <Travel travel={travel} />
//         </Grid>
//       ))}
//     </Grid>
//   );
// };

// export default Travels;
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
