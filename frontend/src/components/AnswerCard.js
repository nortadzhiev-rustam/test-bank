import React, { useState } from "react";
import { Paper, Box, Checkbox, IconButton, Tooltip } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faKeyboard } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { styled } from "@mui/styles";
import "animate.css";
import MyEditor from "./DraftEditor";
import formula from "../formula-fx-icon.svg";
import FormulaEditor from "./FormulaEditor";
const getRandomColor = (index) => {
  switch (index) {
    case 1:
      return "#6a040f";

    case 2:
      return "#bc6c25";

    case 3:
      return "#606c38";

    case 4:
      return "#457b9d";

    case 5:
      return "#bb3e03";

    default:
      return "#006064";
  }
};

const AnswersCard = (props) => {
  // const [checked, setChecked] = React.useState(false);
  // const [image, setImage] = React.useState('');
  // const [answer, setAnswer] = useState([]);
  const [equation, setEquation] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [toEdit, setToEdit] = useState("");
  // const [tempImageURL, setTempImageURL] = useState("");
  const [isEditing, setEditing] = useState(false);
  const [isFlip, setFlip] = useState(false);

  const handleOpen = () => {
    setFlip(!isFlip);
    setTimeout(() => {
      setIsOpen(!isOpen);
    }, 1000);
  };

  return !isOpen ? (
    <StyledPaper
      elevation={10}
      sx={{ backgroundColor: getRandomColor(props.index) }}
      className={
        !isFlip
          ? "animate__animated animate__flipInY"
          : "animate__animated animate__flipOutY"
      }
    >
      <Box
        sx={{
          height: 50,
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <IconBoxContainer>
          <Tooltip
            placement='top'
            arrow
            title={
              props.counter === 2 ? "You should have at least two optoins" : ""
            }
          >
            <IconBox
              variant='button'
              sx={{ backgroundColor: props.counter === 2 ? "#999" : "#006064" }}
            >
              <IconButton
                disabled={props.counter === 2}
                onClick={() => props.onDelete(props.option.key)}
              >
                <FontAwesomeIcon size='xs' icon={faTrashCan} color='white' />
              </IconButton>
            </IconBox>
          </Tooltip>
          <Tooltip placement='top' arrow title='insert formula'>
            <IconBox bgcolor='#006064'>
              <IconButton onClick={handleOpen}>
                <img style={{ height: 20 }} src={formula} alt='formula' />
              </IconButton>
            </IconBox>
          </Tooltip>
        </IconBoxContainer>
        <Box sx={{ height: "100%" }}>
          <Checkbox
            icon={
              <FontAwesomeIcon size='xl' color='white' icon={faCheckCircle} />
            }
            checkedIcon={
              <FontAwesomeIcon size='xl' color='#006064' icon={faCheckCircle} />
            }
          />
        </Box>
      </Box>

      <MyEditor
        setOpen={(o) => setIsOpen(o)}
        latex={{ id: Date.now(), equation }}
        setLatex={(eq) => setToEdit(eq)}
        setEditing={(e) => setEditing(e)}
        edited={toEdit}
        isEditing={isEditing}
        setEquation={(eq) => setEquation(eq)}
        placeholder='Your answer goes here'
        handleOpen={handleOpen}
        setFlip={() => setFlip(true)}
      />
    </StyledPaper>
  ) : (
    <StyledPaper
      elevation={10}
      sx={{ backgroundColor: getRandomColor(props.index) }}
      className={
        isFlip
          ? "animate__animated animate__flipInY"
          : "animate__animated animate__flipOutY"
      }
    >
      <Box
        sx={{
          height: 50,
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <IconBoxContainer>
          <Tooltip
            placement='top'
            arrow
            title={
              props.counter === 2 ? "You should have at least two optoins" : ""
            }
          >
            <IconBox
              variant='button'
              sx={{ backgroundColor: props.counter === 2 ? "#999" : "#006064" }}
            >
              <IconButton
                disabled={props.counter === 2}
                onClick={() => props.onDelete(props.option.key)}
              >
                <FontAwesomeIcon size='xs' icon={faTrashCan} color='white' />
              </IconButton>
            </IconBox>
          </Tooltip>
          <Tooltip placement='top' arrow title='insert formula'>
            <IconBox bgcolor='#006064'>
              <IconButton onClick={handleOpen}>
                <FontAwesomeIcon
                  fontSize='medium'
                  color='white'
                  icon={faKeyboard}
                />
              </IconButton>
            </IconBox>
          </Tooltip>
        </IconBoxContainer>
        <Box sx={{ height: "100%" }}>
          <Checkbox
            icon={
              <FontAwesomeIcon size='xl' color='white' icon={faCheckCircle} />
            }
            checkedIcon={
              <FontAwesomeIcon size='xl' color='#006064' icon={faCheckCircle} />
            }
          />
        </Box>
      </Box>

      <FormulaEditor
        setEquation={(eq) => setEquation(eq)}
        setOpen={(o) => setIsOpen(o)}
        equation={toEdit}
        isEditing={isEditing}
        setEditEquation={(eq) => setToEdit(eq)}
        handleOpen={handleOpen}
        className={" "}
        setFlip={() => setFlip(false)}
      />
    </StyledPaper>
  );
};

export default AnswersCard;

const StyledPaper = styled(Paper)({
  height: 300,
  width: "95%",

  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  alignItems: "center",
  borderRadius: 15,
  paddingLeft: 10,
  paddingRight: 10,
});

const IconBox = styled(Box)({
  width: 30,
  height: 30,

  marginLeft: 10,
  borderRadius: 7,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
});

const IconBoxContainer = styled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  width: "100%",
  justifyContent: "flex-start",
});
