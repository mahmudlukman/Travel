import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Typography,
  Paper,
  Chip,
  useTheme,
  Box,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { CloudUpload } from '@mui/icons-material';
import {
  useGetTravelsQuery,
  useCreateTravelMutation,
} from '../../redux/features/travel/travelApi';
import toast from 'react-hot-toast';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const Form = () => {
  const theme = useTheme();
  const { user } = useSelector((state) => state.auth);
  const { data: travel, refetch } = useGetTravelsQuery();
  const [createTravel, { isLoading, isSuccess, error }] =
    useCreateTravelMutation();
  const [travelData, setTravelData] = useState({
    title: '',
    message: '',
    tags: [],
    image: null,
  });

  // const post = useSelector((state) =>
  //   currentId
  //     ? state.posts.posts.find((message) => message._id === currentId)
  //     : null
  // );

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (reader.readyState === 2) {
          setTravelData({ ...travelData, image: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const clear = () => {
    // setCurrentId(0);
    setTravelData({ title: '', message: '', tags: [], image: null });
  };

  useEffect(() => {
    if (!travel?.title) clear();
    if (travel) setTravelData(travel);
  }, [travel]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTravel({ ...travelData, name: user?.name });
    clear();
    refetch();
    // if (currentId === 0) {
    //   dispatch(createPost({ ...travelData, name: user?.name }, history));
    //   clear();
    // } else {
    //   dispatch(updatePost(currentId, { ...travelData, name: user?.name }));
    //   clear();
    // }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Travel created successfully');
    }
    if (error) {
      if ('data' in error) {
        const errorMessage = error;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isLoading, isSuccess, error]);

  if (!user?.name) {
    return (
      <Paper sx={{ padding: theme.spacing(2) }} elevation={6}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </Paper>
    );
  }

  const handleAddChip = (tag) => {
    setTravelData({ ...travelData, tags: [...travelData.tags, tag] });
  };

  const handleDeleteChip = (chipToDelete) => {
    setTravelData({
      ...travelData,
      tags: travelData.tags.filter((tag) => tag !== chipToDelete),
    });
  };

  return (
    <Paper sx={{ padding: theme.spacing(2) }} elevation={6}>
      <form
        autoComplete="off"
        noValidate
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          '& .MuiTextField-root': { margin: theme.spacing(1) },
        }}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">Creating a Memory</Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          sx={{ width: '100%', marginBottom: '10px' }}
          value={travelData.title}
          onChange={(e) =>
            setTravelData({ ...travelData, title: e.target.value })
          }
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          multiline
          rows={4}
          sx={{ width: '100%', marginBottom: '10px' }}
          value={travelData.message}
          onChange={(e) =>
            setTravelData({ ...travelData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags (coma separated)"
          sx={{ width: '100%' }}
          value={travelData.tags}
          onChange={(e) =>
            setTravelData({ ...travelData, tags: e.target.value.split(',') })
          }
        />
        {/* <Box style={{ padding: '5px 0', width: '94%' }}>
          <Chip
            name="tags"
            variant="outlined"
            label="Tags"
            fullWidth
            value={travelData.tags}
            clickable={(chip) => handleAddChip(chip)}
            onDelete={(chip) => handleDeleteChip(chip)}
          />
        </Box> */}
        <Box sx={{ width: '97%', margin: '10px 0' }}>
          <Box sx={{ width: '100%', minHeight: '50px' }}>
            {travelData.image && (
              <img
                src={travelData.image}
                alt=""
                style={{ width: '100%', objectFit: 'cover' }}
              />
            )}
          </Box>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUpload />}
          >
            Upload file
            <VisuallyHiddenInput
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              // style={{ display: 'none' }}
            />
          </Button>
        </Box>
        <Button
          sx={{ width: '100%', marginBottom: '10px' }}
          variant="contained"
          color="primary"
          size="small"
          type="submit"
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            'Submit'
          )}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          sx={{ width: '100%' }}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
