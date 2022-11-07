import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import DropzoneComponent from "./Dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function AlertDialogSlide({ open, setOpen, setImage }) {
  const [file, setFile] = useState([]);
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    let data = new FormData();
    data.append("file", file[0]);
    let req = await axios.post("http://localhost:5000/api/v1/upload", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    setImage(req.data);
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle>
          <FontAwesomeIcon color='#888888' icon={faImages} />
          {" Insert an image here"}
        </DialogTitle>
        <DialogContent
          sx={{
            height: 400,
            width: 500,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <DropzoneComponent setImage={setFile} open={open} />
        </DialogContent>
        <DialogActions>
          <Button variant='contained' color='error' onClick={handleClose}>
            Cancel
          </Button>
          <Button variant='contained' color='primary' onClick={handleSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
