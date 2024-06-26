import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Typography,
  Paper,
  useTheme,
  Box,
  CircularProgress,
} from '@mui/material';
import { MuiChipsInput } from 'mui-chips-input';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { CloudUpload } from '@mui/icons-material';
import {
  useGetTravelsQuery,
  useCreateTravelMutation,
  useUpdateTravelMutation,
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

const Form = ({ currentId, setCurrentId, page }) => {
  const theme = useTheme();
  const { user } = useSelector((state) => state.auth);
  const { data: travel, refetch } = useGetTravelsQuery(page);
  const [createTravel, { isLoading, isSuccess, error }] =
    useCreateTravelMutation();
  const [
    updateTravel,
    { isLoading: updateLoading, isSuccess: updateSuccess, error: updateError },
  ] = useUpdateTravelMutation();
  const [travelData, setTravelData] = useState({
    title: '',
    message: '',
    tags: [],
    image: null,
  });


  const updateTravelData = currentId
    ? travel.data.find((message) => message._id === currentId)
    : null;

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
    setCurrentId(0);
    setTravelData({ title: '', message: '', tags: [], image: null });
  };

  useEffect(() => {
    if (updateTravelData) {
      setTravelData({
        title: updateTravelData.title,
        message: updateTravelData.message,
        tags: updateTravelData.tags,
        image: updateTravelData.image ? updateTravelData.image.url : null,
      });
    }
  }, [updateTravelData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentId === 0) {
      await createTravel({ ...travelData, name: user?.name });
    } else {
      await updateTravel({ id: currentId, data: travelData });
      toast.success('Travel updated successfully');
    }
    clear();
    refetch();
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
          Please Sign In to create your own travels.
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
        <Typography variant="h6">
          {currentId
            ? `Editing "${updateTravelData?.title}"`
            : 'Create a Travel'}
        </Typography>
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
        <MuiChipsInput
          style={{ width: '100%' }}
          value={travelData.tags}
          onAddChip={(chip) => handleAddChip(chip)}
          onDeleteChip={(chip) => handleDeleteChip(chip)}
          label="Tags"
          variant="outlined"
        />
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
          ) : currentId ? (
            'Update'
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
