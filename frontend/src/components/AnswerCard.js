import React, { useState } from "react";
import { Paper, Box, Checkbox, IconButton, Tooltip } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faKeyboard,
  faCheckCircle as checkCircle,
} from "@fortawesome/free-solid-svg-icons";
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
  // const [image, setImage] = React.useState('');
  // const [answer, setAnswer] = useState([]);
  const [equation, setEquation] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [toEdit, setToEdit] = useState("");
  // const [tempImageURL, setTempImageURL] = useState("");
  const [isEditing, setEditing] = useState(false);
  const [isClosing, setClosing] = useState(false);
  const [isDeleted, setDeleted] = useState(false);
  const [content, setContent] = useState("");
  const [isHover, setHover] = useState(false);
  const handleOpen = () => {
    setClosing(false);
    setIsOpen(true);
    setToEdit("");
  };

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setIsOpen(false);
    }, 1500);
  };

  const setCheckBox = (e, key) => {
    switch (key) {
      case 1:
        return props.setChecked.a(e.target.checked);
        break;
      case 2:
        return props.setChecked.b(e.target.checked);
        break;
      case 3:
        return props.setChecked.c(e.target.checked);
        break;
      case 4:
        return props.setChecked.d(e.target.checked);
        break;
      default:
        return null;
    }
  };

  const getCheckBox = (key) => {
    switch (key) {
      case 1:
        return props.isChecked.a;
        break;
      case 2:
        return props.isChecked.b;
        break;
      case 3:
        return props.isChecked.c;
        break;
      case 4:
        return props.isChecked.d;
        break;
      default:
        return null;
    }
  };

  return (
    <StyledPaper
      elevation={10}
      sx={{ backgroundColor: getRandomColor(props.index) }}
    >
      {isOpen && (
        <Box sx={{ width: "95%" }}>
          <FormulaEditor
            setEquation={(eq) => setEquation(eq)}
            setOpen={(o) => setIsOpen(o)}
            equation={toEdit}
            isEditing={isEditing}
            setEditEquation={(eq) => setToEdit(eq)}
            handleOpen={handleOpen}
            setClosing={(e) => setClosing(e)}
            isClosing={isClosing}
            className={
              isClosing
                ? "animate__animated animate__bounceOutDown animate__slow"
                : "animate__animated animate__bounceInUp animate__slow"
            }
          />
        </Box>
      )}
      <Box
        sx={{
          height: 50,
          width: "100%",
          padding: 0,
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
                onClick={() => {
                  setDeleted(!isDeleted);
                  props.setDeleted(!isDeleted);
                  props.onDelete(props.option.key);
                }}
              >
                <FontAwesomeIcon size='xs' icon={faTrashCan} color='white' />
              </IconButton>
            </IconBox>
          </Tooltip>
          <Tooltip
            placement='top'
            arrow
            title={isOpen ? "Close" : "insert equation"}
          >
            <IconBox bgcolor='#006064'>
              <IconButton onClick={isOpen ? handleClose : handleOpen}>
                {isOpen ? (
                  <FontAwesomeIcon size='sm' color='#fff' icon={faKeyboard} />
                ) : (
                  <img style={{ height: 20 }} src={formula} alt='formula' />
                )}
              </IconButton>
            </IconBox>
          </Tooltip>
        </IconBoxContainer>
        <Tooltip
          placement='top'
          arrow
          title={
            content === ""
              ? "editor can't be empty"
              : "check the coorect answer"
          }
        >
          <Box sx={{ height: "100%" }}>
            <Checkbox
              disabled={content == ""}
              onChange={(e) => setCheckBox(e, props.index)}
              checked={getCheckBox(props.index)}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              icon={
                <FontAwesomeIcon
                  size='xl'
                  color={isHover ? "#fff" : "#999"}
                  icon={faCheckCircle}
                />
              }
              checkedIcon={
                <FontAwesomeIcon size='xl' color='#fff' icon={checkCircle} />
              }
            />
          </Box>
        </Tooltip>
      </Box>

      <Box width={"90%"}>
        <MyEditor
          latex={{ id: Date.now(), equation }}
          setLatex={(eq) => setToEdit(eq)}
          setEditing={(e) => setEditing(e)}
          edited={toEdit}
          isEditing={isEditing}
          setEquation={(eq) => setEquation(eq)}
          placeholder='Your answer goes here'
          handleOpen={handleOpen}
          editorId={`answer${props.option.key}`}
          setContent={setContent}
        />
      </Box>
    </StyledPaper>
  );
};

export default AnswersCard;

const StyledPaper = styled(Paper)({
  minHeight: 300,
  width: "100%",

  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  alignItems: "center",
  borderBottomLeftRadius: 15,
  borderBottomRightRadius: 15,
  borderTopLeftRadius: 15,
  borderTopRightRadius: 25,
  paddingLeft: 0,
  paddingBottom: 10,
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
