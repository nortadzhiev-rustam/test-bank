import React from "react";
import { Paper, Box, Checkbox, IconButton, Tooltip } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faCamera } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { styled } from "@mui/styles";
import { Functions } from "@mui/icons-material";
import InputEditor from "./Editor";
import "./style.css";

const StyledPaper = styled(Paper)({
  height: 370,
  width: "100%",
  marginInline: 5,
  marginBlock: 20,
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  alignItems: "center",
  borderRadius: 15,
  
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
    border: "2px solid #2a9d8f",
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
      return "#2a9d8f";
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
          <IconBox variant='button' sx={{ backgroundColor: "#2a9d8f" }}>
            <Functions sx={{ color: "white" }} />
          </IconBox>
          <IconBox variant='button' sx={{ backgroundColor: "#2a9d8f" }}>
            <label htmlFor='icon-button-file'>
              <Input accept='image/*' id='icon-button-file' type='file' />
              <IconButton aria-label='upload picture' component='span'>
                <FontAwesomeIcon size='xs' icon={faCamera} color='white' />
              </IconButton>
            </label>
          </IconBox>

          <Tooltip
            placement='top'
            arrow
            title={
              props.counter === 2 ? "You should have at least two optoins" : ""
            }
          >
            <IconBox
              variant='button'
              sx={{ backgroundColor: props.counter === 2 ? "#999" : "#2a9d8f" }}
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

      {/* <AnswerBox
        onInput={(e) => {
          var pElement = document.createElement("p");
          var bodyText = document.querySelector(".answer");
          var firstLine = bodyText.firstChild;

          pElement.appendChild(firstLine);
          bodyText.prepend(pElement);

          console.log(bodyText.outerHTML);
        }}
        sx={{
          "&:focus": {
            border: "2px solid #2a9d8f",
          },
        }}
        contentEditable
        suppressContentEditableWarning
      >
        <p className='answer' id='answer' placeholder='Insert Answer here'></p>
      </AnswerBox> */}
      <InputEditor onChange={(ans) => setAnswer(ans)} placeholder={'Enter your answers here...'}/>
    </StyledPaper>
  );
};

export default AnswersCard;
