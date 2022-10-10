import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import AnswersCard from "./AnswerCard";
import { IconButton, Paper, Tooltip } from "@mui/material";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
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
  return (
    <Grid
      container
      spacing={3}
      sx={{
        marginTop: 10,
        marginInline: 3,

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
            lg={isFull ? 3 : 4}
            xl={isFull ? 2 : 3}
          >
            <AnswersCard
              index={idx + 1}
              onDelete={deleteOption}
              option={option}
              counter={counter}
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
              color={counter !== 4 && "#006064"}
            />
          </IconButton>
        </Paper>
      </Tooltip>
    </Grid>
  );
}
