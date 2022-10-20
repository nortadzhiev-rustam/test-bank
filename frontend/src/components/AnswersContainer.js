import React, { useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import AnswersCard from "./AnswerCard";
import {
  IconButton,
  Paper,
  Tooltip,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
} from "@mui/material";
import { indigo } from "@mui/material/colors";
import { faL, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AnswersContainer({ isHover, isFull }) {
  const [counter, setCounter] = React.useState(2);
  const [options, setOptions] = React.useState([
    {
      option: 1,
      key: 0,
    },
    {
      option: 2,
      key: 1,
    },
  ]);
  const [correctAnswer, setCorrectAnswer] = React.useState(0);
  const [isDeleted, setDeleted] = React.useState(false);
  const [checked1, setChecked1] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);
  const [checked3, setChecked3] = React.useState(false);
  const [checked4, setChecked4] = React.useState(false);
  const getRandomOption = () => {
    const set = new Set();
    let randomNumber = Math.floor(Math.random() * 4) + 1;
    options.forEach((item) => {
      set.add(item.option);
    });
    while (set.has(randomNumber)) {
      randomNumber = Math.floor(Math.random() * 4) + 1;
    }
    return randomNumber;
  };

  const getRandomKey = () => {
    const set = new Set();
    let randomNumber = Math.floor(Math.random() * 4) + 1;
    options.forEach((item) => {
      set.add(item.key);
    });
    while (set.has(randomNumber)) {
      randomNumber = Math.floor(Math.random() * 4) + 1;
    }
    return randomNumber;
  };

  const addOption = () => {
    setOptions([
      ...options,
      {
        option: getRandomOption(),
        key: getRandomKey(),
      },
    ]);
    setCounter(counter + 1);
  };

  const deleteOption = (key) => {
    setOptions(options.filter((item) => item.key !== key));
    setCounter(counter - 1);
  };
  useEffect(() => {
    if (checked1) {
      setChecked2(false);
      setChecked3(false);
      setChecked4(false);
    } else if (checked2) {
      setChecked1(false);
      setChecked3(false);
      setChecked4(false);
    } else if (checked3) {
      setChecked2(false);
      setChecked1(false);
      setChecked4(false);
    } else if (checked4) {
      setChecked1(false);
      setChecked2(false);
      setChecked3(false);
    }
    //  else {
    //   setChecked1(false);
    //   setChecked2(false);
    //   setChecked3(false);
    //   setChecked4(false);
    // }
  }, [checked1, checked2, checked3, checked4]);

  return (
    <Grid
      container
      spacing={1}
      sx={{
        marginTop: 10,
        marginInline: 1,

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {options.map((option, idx) => {
        return (
          <Grid
            key={idx}
            xs={12}
            sm={6}
            lg={12 / counter}
            xl={12 / counter}
            sx={{ position: "relative" }}
          >
            <AnswersCard
              index={idx + 1}
              onDelete={deleteOption}
              option={option}
              counter={counter}
              setDeleted={(e) => setDeleted(e)}
              isDeleted={isDeleted}
              isChecked={{ a: checked1, b: checked2, c: checked3, d: checked4 }}
              setChecked={{
                a: setChecked1,
                b: setChecked2,
                c: setChecked3,
                d: setChecked4,
              }}
            />
          </Grid>
        );
      })}

      <Tooltip
        placement='left'
        arrow
        title={counter === 4 ? "You can not add more then four options" : ""}
      >
        <Paper
          sx={{
            position: "absolute",
            right: -85,
            width: 70,
            padding: 1,
            borderTopRightRadius: 50,
            borderBottomRightRadius: 50,
          }}
          // elevation={counter !== 4 && (isHover ? 5 : 2)}
        >
          <IconButton disabled={counter === 4} onClick={addOption}>
            <FontAwesomeIcon
              size='2x'
              icon={faPlusCircle}
              color={counter !== 4 ? "#006064" : undefined}
            />
          </IconButton>
        </Paper>
      </Tooltip>
    </Grid>
  );
}
