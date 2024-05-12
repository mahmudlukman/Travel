import React, { useState } from 'react';
import {
  AppBar,
  Button,
  Container,
  Grid,
  Grow,
  useTheme,
  TextField,
  Paper,
} from '@mui/material';
import { MuiChipsInput } from 'mui-chips-input';
import Pagination from '../Pagination';
import Form from '../Form/Form';
import Travels from '../Travels/Travels';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetTravelBySearchQuery } from '../../redux/features/travel/travelApi';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const theme = useTheme();
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  const [currentId, setCurrentId] = useState(0);
  const {
    data: searchResults,
    isLoading,
    isError,
  } = useGetTravelBySearchQuery({
    search,
    tags: tags.join(','),
  });

  const searchPost = () => {
    if (search.trim() || tags.length > 0) {
      navigate(`search?searchQuery=${search || 'none'}&tags=${tags}`);
    } else {
      navigate('/');
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleAddChip = (tag) => setTags([...tags, tag]);

  const handleDeleteChip = (chipToDelete) =>
    setTags(tags.filter((tag) => tag !== chipToDelete));

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
            <Travels
              searchResults={searchResults}
              setCurrentId={setCurrentId}
              page={page}
            />
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
                onChange={(e) => setSearch(e.target.value)}
              />
              <MuiChipsInput
                style={{ margin: '10px 0' }}
                value={tags}
                onAddChip={(chip) => handleAddChip(chip)}
                onDeleteChip={(chip) => handleDeleteChip(chip)}
                label="Search Tags"
                variant="outlined"
              />
              <Button onClick={searchPost} variant="contained" color="primary">
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
