import React, { useState } from "react";
import { Box, Typography, Tooltip, IconButton, Button } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import Formula from "../formula-fx-icon.svg";
import FormulaEditor from "../components/FormulaEditor";
import MyEditor from "./DraftEditor";
import { blue, green } from "@mui/material/colors";
const QuestionInput = () => {
  const [equation, setEquation] = useState("");
  const [isOpen, setIsOpen] = useState(false);
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
              <Button
                sx={{ marginRight: "0px" }}
                color='primary'
                onClick={() => setIsOpen(!isOpen)}
              >
                <img
                  style={{ height: 25 }}
                  src={Formula}
                  alt='formula'
                />
              </Button>
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
      <MyEditor
        setOpen={(o) => setIsOpen(o)}
        latex={equation}
        setLatex={(eq) => setEquation(eq)}
      />

      {isOpen && (
        <FormulaEditor
          setEquation={(eq) => setEquation(eq)}
          setOpen={(o) => setIsOpen(o)}
          equation={equation}
        />
      )}
    </Box>
  );
};

export default QuestionInput;
