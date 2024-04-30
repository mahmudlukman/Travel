import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Typography,
  Paper,
  Chip,
  useTheme,
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { CloudUpload } from '@mui/icons-material';
// import ChipInput from 'material-ui-chip-input';

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
  // const [postData, setPostData] = useState({
  //   title: '',
  //   message: '',
  //   tags: [],
  //   selectedFile: '',
  // });
  // const post = useSelector((state) =>
  //   currentId
  //     ? state.posts.posts.find((message) => message._id === currentId)
  //     : null
  // );
  // const dispatch = useDispatch();

  // const clear = () => {
  //   setCurrentId(0);
  //   setPostData({ title: '', message: '', tags: [], selectedFile: '' });
  // };

  // useEffect(() => {
  //   if (!post?.title) clear();
  //   if (post) setPostData(post);
  // }, [post]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (currentId === 0) {
  //     dispatch(createPost({ ...postData, name: user?.name }, history));
  //     clear();
  //   } else {
  //     dispatch(updatePost(currentId, { ...postData, name: user?.name }));
  //     clear();
  //   }
  // };

  // if (!user?.name) {
  //   return (
  //     <Paper className={classes.paper} elevation={6}>
  //       <Typography variant="h6" align="center">
  //         Please Sign In to create your own memories and like other's memories.
  //       </Typography>
  //     </Paper>
  //   );
  // }

  // const handleAddChip = (tag) => {
  //   setPostData({ ...postData, tags: [...postData.tags, tag] });
  // };

  // const handleDeleteChip = (chipToDelete) => {
  //   setPostData({
  //     ...postData,
  //     tags: postData.tags.filter((tag) => tag !== chipToDelete),
  //   });
  // };

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
        // onSubmit={handleSubmit}
      >
        <Typography variant="h6">Creating a Memory</Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          sx={{ width: '100%', marginBottom: '10px' }}
          // value={postData.title}
          // onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          multiline
          rows={4}
          sx={{ width: '100%' }}
          // value={postData.message}
          // onChange={(e) =>
          //   setPostData({ ...postData, message: e.target.value })
          // }
        />
        <div style={{ padding: '5px 0', width: '94%' }}>
          <Chip
            name="tags"
            variant="outlined"
            label="Tags"
            sx={{ width: '100%' }}
            // value={postData.tags}
            // onClick={(chip) => handleAddChip(chip)}
            // onDelete={(chip) => handleDeleteChip(chip)}
          />
        </div>
        <Box sx={{ width: '97%', margin: '10px 0' }}>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUpload />}
          >
            Upload file
            <VisuallyHiddenInput type="file" />
          </Button>
        </Box>
        <Button
          sx={{ width: '100%', marginBottom: '10px' }}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          // onClick={clear}
          sx={{ width: '100%' }}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
