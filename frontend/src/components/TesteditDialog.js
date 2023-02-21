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
  IconButton,
} from "@mui/material";
import DropzoneComponent from "./Dropzone";
import DeleteIcon from "@mui/icons-material/Delete";
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
  const [img, setImg] = React.useState("");
  const [publicc, setPublic] = React.useState("Public");
  const [isLoading, setLoading] = React.useState(false);
  const { id } = useParams();
  const handleCancel = () => {
    onClose(false);
  };

  React.useEffect(() => {
    setSelected(grade);
  }, [grade]);
  React.useEffect(() => {
    setImg(imageName);
  }, [imageName]);

  React.useEffect(() => {
    const uploadImage = async () => {
      let data = new FormData();
      data.append("file", image[0]);

      const res = await axios.post(
        "https://www.backend.rustamnortadzhiev.com/api/v1/upload",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setImg(res.data);
      setLoading(false);
    };
    if (image.length !== 0) {
      setLoading(true);
      uploadImage();
    }
  }, [image]);

  const handleDelete = async () => {
    const res = await axios.delete(
      "https://www.backend.rustamnortadzhiev.com/api/v1/files/" + imageName
    );
    console.log(res.message);
    setImg("");
    setImage([]);
  };
  const updateTestSettings = async () => {
    try {
      if (img !== "")
        return await axios.put(
          `https://www.backend.rustamnortadzhiev.com/api/v1/test/${id}?grade=${selected}&image=${img}`
        );
      else
        return await axios.put(
          `https://www.backend.rustamnortadzhiev.com/api/v1/test/${id}?grade=${selected}&image=`
        );
    } catch (err) {
      console.log(err);
    }
  };

  const handleOk = async () => {
    setLoading(true);
    try {
      const res = await axios.all([updateTestSettings()]);
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
            {img !== null &&
            img !== undefined &&
            imageName !== "" &&
            img !== "" ? (
              <Box
                maxWidth='100%'
                height={150}
                component='div'
                sx={{
                  border: "1px",
                  borderStyle: "dashed",
                  borderColor: "#888",
                  borderRadius: 2,
                  position: "relative",
                  backgroundColor: "white",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <IconButton
                  sx={{ position: "absolute", top: -5, right: -8 }}
                  onClick={handleDelete}
                >
                  <DeleteIcon color='action' fontSize='small' />
                </IconButton>

                <img
                  src={
                    process.env.PUBLIC_URL + "/uploads/" + (imageName || img)
                  }
                  alt='inputImage'
                  style={{
                    width: "100%",
                    maxHeight: "140px",
                    objectFit: "contain",
                    borderRadius: "15px",
                  }}
                />
              </Box>
            ) : (
              <DropzoneComponent open={open} setImage={setImage} />
            )}
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
                  <MenuItem key={_} value={idx + 4}>
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
