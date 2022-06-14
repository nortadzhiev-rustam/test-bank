import React from "react";
import { Paper, Box, Checkbox, IconButton, Tooltip } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faCamera } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { styled } from "@mui/styles";
import { Functions } from "@mui/icons-material";
import InputEditor from "./Editor";
import "./style.css";
import EditorV2 from './EditorV2';

const StyledPaper = styled(Paper)({
  height: 370,
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

const AnswerBox = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "80%",

  borderRadius: 10,
  justifyContent: "center",
  overflowY: "auto",
  marginBottom: 10,
  "&:hover": {
    border: "2px solid #006064",
  },
});

const IconBoxContainer = styled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",

  

  justifyContent: "space-between",
});

const Input = styled("input")({
  display: "none",
});

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
  const [answer, setAnswer] = React.useState([]);

  return (
    <StyledPaper
      elevation={5}
      sx={{ backgroundColor: getRandomColor(props.index) }}
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
        </IconBoxContainer>
        <Box sx={{ height: "100%" }}>
          <Checkbox
            icon={
              <FontAwesomeIcon size='xl' color='white' icon={faCheckCircle} />
            }
            checkedIcon={
              <FontAwesomeIcon size='xl' color='#14213d' icon={faCheckCircle} />
            }
          />
        </Box>
      </Box>

      
      <EditorV2 height='265px' placeholder='Enter your answer here...'/>
    </StyledPaper>
  );
};

export default AnswersCard;
