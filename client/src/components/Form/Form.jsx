import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Typography,
  Paper,
  Chip,
  useTheme,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
// import ChipInput from 'material-ui-chip-input';

const Form = ({ currentId, setCurrentId }) => {
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
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? `Editing "${post?.title}"` : 'Creating a Memory'}
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          multiline
          rows={4}
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <div style={{ padding: '5px 0', width: '94%' }}>
          <Chip
            name="tags"
            variant="outlined"
            label="Tags"
            fullWidth
            value={postData.tags}
            onClick={(chip) => handleAddChip(chip)}
            onDelete={(chip) => handleDeleteChip(chip)}
          />
        </div>
        <Box sx={{ width: '97%', margin: '10px 0' }}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </Box>
        <Button
          sx={{ marginBottom: 10 }}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
