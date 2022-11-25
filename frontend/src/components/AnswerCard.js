import React, { useState, useEffect } from "react";
import { Paper, Box, Checkbox, IconButton, Tooltip } from "@mui/material";
import { tooltipClasses } from "@mui/material/Tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faKeyboard,
  faCheckCircle as checkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";

import { styled } from "@mui/material/styles";
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
  //const [answer, setAnswer] = useState([]);
  const [equation, setEquation] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [toEdit, setToEdit] = useState("");
  // const [tempImageURL, setTempImageURL] = useState("");
  const [isEditing, setEditing] = useState(false);
  const [isClosing, setClosing] = useState(false);
  const [isDeleted, setDeleted] = useState(false);
  const [content, setContent] = useState("");
  const [isHover, setHover] = useState(false);

  const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: content ? "#000000" : "#d50000",
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: content ? "#000000" : "#d50000",
    },
  }));
  const BootstrapTooltip2 = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: props.counter > 2 ? "#000000" : "#d50000",
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: props.counter > 2 ? "#000000" : "#d50000",
    },
  }));
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

  //method for watching content change and settitng it to props.answer
  const handleContentChange = (content) => {
    setContent(content);
  };
  const { addAnswer, option } = props;

  useEffect(() => {
    if (content !== "") {
      addAnswer({ key: option.option, content });
    }
  }, [content]);

  const setCheckBox = (e, key) => {
    props.setChecked.a(false);
    props.setChecked.b(false);
    props.setChecked.c(false);
    props.setChecked.d(false);

    switch (key) {
      case 0:
        return content && props.setChecked.a(e.target.checked);
      case 1:
        return content && props.setChecked.b(e.target.checked);
      case 2:
        return content && props.setChecked.c(e.target.checked);
      case 3:
        return content && props.setChecked.d(e.target.checked);
      default:
        return false;
    }
  };

  const getCheckBox = (key) => {
    switch (key) {
      case 0:
        return props.isChecked.a;
      case 1:
        return props.isChecked.b;
      case 2:
        return props.isChecked.c;
      case 3:
        return props.isChecked.d;
      default:
        return false;
    }
  };

  return (
    <>
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
      <StyledPaper
        elevation={10}
        sx={{ backgroundColor: getRandomColor(props.index) }}
        id={props.index}
        className={
          isDeleted
            ? "animate__animated animate__fadeOutDown"
            : "animate__animated animate__fadeInRight"
        }
      >
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
            <BootstrapTooltip2
              placement='top'
              arrow
              title={
                props.counter < 3 ? "You should have at least two optoins" : ""
              }
            >
              <IconBox
                variant='button'
                sx={{
                  backgroundColor: props.counter === 2 ? "#999" : "#006064",
                }}
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
            </BootstrapTooltip2>
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
          {props.type === "Multiple-choice" && (
            <BootstrapTooltip
              placement='top'
              title={
                content === ""
                  ? "Editor can't be empty"
                  : "Mark the coorect answer"
              }
            >
              <Box sx={{ height: "100%" }}>
                <Checkbox
                  disabled={content === ""}
                  onChange={(e) => setCheckBox(e, props.option.key)}
                  checked={content !== "" && getCheckBox(props.option.key)}
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
                    <FontAwesomeIcon
                      size='xl'
                      color='#fff'
                      icon={checkCircle}
                    />
                  }
                />
              </Box>
            </BootstrapTooltip>
          )}
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
            setContent={handleContentChange}
          />
        </Box>
      </StyledPaper>
    </>
  );
};

export default AnswersCard;

const StyledPaper = styled(Paper)({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  alignItems: "center",
  borderBottomLeftRadius: 15,
  borderBottomRightRadius: 15,
  borderTopLeftRadius: 15,
  borderTopRightRadius: 25,
  paddingLeft: 0,
  paddingBlock: 10,
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
