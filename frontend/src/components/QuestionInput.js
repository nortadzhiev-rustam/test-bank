import React, { useState } from "react";
import { Box, Typography, TextField, Tooltip, IconButton } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { faReact } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormulaEditor from "../components/FormulaEditor";
import MyEditor from "./DraftEditor";
const QuestionInput = () => {
  const [equation, setEquation] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <Box
      style={{
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "#ccc",
        borderRadius: "5px",
        padding: "10px",
        marginInline: "2px",
      }}
    >
      <Box display='flex' flexDirection='row' alignItems='center'>
        <Typography
          mr={1}
          color='primary'
          fontSize={18}
          textTransform='uppercase'
          variant='body1'
          ml={0.5}
          pb={1}
        >
          Question
        </Typography>
        {!isOpen && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "10px",
            }}
          >
            <Tooltip
              title='Click here to inser Formula'
              arrow
              sx={{ marginBottom: "5px" }}
            >
              <IconButton
                sx={{ marginRight: "5px" }}
                color='primary'
                variant='contained'
                onClick={() => setIsOpen(!isOpen)}
              >
                <FontAwesomeIcon icon={faReact} />
              </IconButton>
            </Tooltip>
            <Tooltip title='Click to Upload picture' arrow>
              <IconButton
                color='primary'
                variant='contained'
                sx={{ marginRight: "5px" }}
                aria-label='upload picture'
                component='label'
              >
                <input hidden accept='image/*' type='file' />
                <PhotoCamera />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </Box>
      <MyEditor latex={equation} />

      {isOpen && <FormulaEditor setEquation={(eq) => setEquation(eq)} setOpen={(o) => setIsOpen(o)} />}
    </Box>
  );
};

export default QuestionInput;
