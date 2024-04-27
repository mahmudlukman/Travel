import {
  AppBar,
  Button,
  Container,
  Grid,
  Grow,
  useTheme,
  Chip,
} from '@mui/material';
import React from 'react';

const Home = () => {
  const theme = useTheme();
  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
          sx={{
            [theme.breakpoints.down('xs')]: {
              flexDirection: 'column-reverse',
            },
          }}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              sx={{
                borderRadius: 4,
                marginBottom: '1rem',
                display: 'flex',
                padding: '16px',
              }}
              position="static"
              color="inherit"
            >
              <TextField
                onKeyDown={handleKeyPress}
                name="search"
                variant="outlined"
                label="Search Memories"
                fullWidth
                value={search}
                // onChange={(e) => setSearch(e.target.value)}
              />
              <Chip
                style={{ margin: '10px 0' }}
                value={tags}
                // onClick={(chip) => handleAddChip(chip)}
                // onDelete={(chip) => handleDeleteChip(chip)}
                label="Search Tags"
                variant="outlined"
              />
              <Button
                // onClick={searchPost}
                // className={classes.searchButton}
                variant="contained"
                color="primary"
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper
              sx={{ borderRadius: 4, marginTop: '1rem', padding: '16px' }}
              elevation={6}
            >
              <Pagination page={page} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
