import React, { useState, useEffect } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  Typography,
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Slide,
} from "@mui/material";
import axios from "axios";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const CollectionDialog = ({
  isOpen,
  setCollections,
  collections,
  testData,
  user,
  handleSaveDialogOpen,
}) => {
  const [collectionId, setCollectionId] = useState();
  const [newCollection, setNewCollection] = useState("");

  const handleDone = async () => {
    const data = {
      name: newCollection,

      userId: user.id,
    };
    if (newCollection !== "") {
      try {
        const res = await axios.post(
          `https://backend.rustamnortadzhiev.com/api/v1/collection`,
          data
        );
        setCollections([...collections, res.data.collection]);
        const res2 = await axios.put(
          `https://backend.rustamnortadzhiev.com/api/v1/test/${testData.id}?collectionId=${res.data.collection.id}`
        );
        console.log(res2.data.message);
        handleSaveDialogOpen();
      } catch (e) {
        console.log(e);
      }
    } else {
      handleSaveDialogOpen();
    }
  };

  const handleChange = async (event) => {
    setCollectionId(Number(event.target.value));
    try {
      const res = await axios.put(
        `https://backend.rustamnortadzhiev.com/api/v1/test/${
          testData.id
        }?collectionId=${Number(event.target.value)}`
      );
      console.log(res.data.message);
    } catch (e) {
      console.log(e);
    }
  };
    useEffect(() => {
      setCollectionId(testData?.collectionId);
      return () => {
        setCollectionId(0);
      };
    }, [testData?.collectionId]);

  return (
    <Dialog
      maxWidth='xs'
      fullWidth
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleSaveDialogOpen}
      aria-describedby='alert-dialog-slide-description'
    >
      <DialogTitle>Add "{testData?.name}" to collection</DialogTitle>
      <DialogContent>
        <FormControl>
          <RadioGroup value={collectionId} onChange={handleChange}>
            {collections.filter((item) => item.userId === user.id)
              .map((item) => (
                <FormControlLabel
                  key={item.name}
                  value={item.id}
                  control={<Radio/>}
                  label={item.name}
                />
              ))}
          </RadioGroup>
        </FormControl>
        <Divider variant='fullWidth' sx={{ mt: 5, mb: 3 }} />
        <Typography>Create a new collection</Typography>
        <TextField
          fullWidth
          label='Input a collection name'
          placeholder='e.g Exams, Physics, Quiz, etc.'
          onChange={(e) => setNewCollection(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant='contained'
          color='error'
          onClick={() => handleSaveDialogOpen()}
        >
          {"Cancel"}
        </Button>
        <Button variant='contained' onClick={() => handleDone()}>
          {"Done"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CollectionDialog;
