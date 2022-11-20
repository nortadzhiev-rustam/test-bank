import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  Slide,
  CircularProgress,
} from "@mui/material";
import DropzoneComponent from "./Dropzone";
import axios from "axios";
import { useParams } from "react-router-dom";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});
export default function TesteditDialog({
  onClose,
  open,

  isEditing,
  setEditing,
  setImageName,
  imageName,
  grade,
  ...other
}) {
  const [selected, setSelected] = React.useState("");
  const [image, setImage] = React.useState([]);
  const [publicc, setPublic] = React.useState("Public");
  const [isLoading, setLoading] = React.useState(false);
  const { id } = useParams();
  const handleCancel = () => {
    onClose(false);
  };

  React.useEffect(() => {
    setSelected(grade);
  }, [grade]);

  const uploadImage = async () => {
    if (image.length !== 0) {
      let data = new FormData();
      data.append("file", image[0]);

      const res = await axios.post(
        "http://localhost:5000/api/v1/upload",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setImageName(res.data);
    }
  };

  const updateTestSettings = async () => {
    return await axios.put(
      `http://localhost:5000/api/v1/test/${id}?grade=${selected}&image=${imageName}`
    );
  };

  const handleOk = async () => {
    setLoading(true);
    try {
      const res = await axios.all([uploadImage(), updateTestSettings()]);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setEditing(false);
      setTimeout(() => {
        setLoading(false);
        handleCancel();
      }, 500);
    }
  };
  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth='xs'
      open={open}
      TransitionComponent={Transition}
      {...other}
    >
      <DialogTitle>Test Settings</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={1}>
          <Typography>1.Add a title image</Typography>
          <Box
            width='100%'
            dislay='flex'
            justifyContent='center'
            alignItems='center'
          >
            <DropzoneComponent open={open} setImage={setImage} />
          </Box>
          <Typography>2.Select grade</Typography>
          <FormControl fullWidth>
            <InputLabel id='select-grade'>Grades</InputLabel>
            <Select
              id='select-grades'
              variant='outlined'
              label='Grades'
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
            >
              <MenuItem value={1}>1st Grade</MenuItem>
              <MenuItem value={2}>2nd Grade</MenuItem>
              <MenuItem value={3}>3rd Grade</MenuItem>
              {Array(9)
                .fill()
                .map((_, idx) => (
                  <MenuItem key={idx} value={idx + 4}>
                    {idx + 4}th Grade
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <Typography>3.Who can see this test</Typography>
          <FormControl fullWidth>
            <Select
              id='select-grades'
              variant='outlined'
              value={publicc}
              onChange={(e) => setPublic(e.target.value)}
            >
              <MenuItem value='Public'>Public, visible to everyone</MenuItem>
              <MenuItem value='Private'>Private, only visible to you</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button disabled={isLoading} onClick={handleOk}>
          {isLoading ? <CircularProgress color='success' size={24} /> : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
