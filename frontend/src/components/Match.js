import React, { useState } from "react";
import { Stack, TextField } from "@mui/material";
import AnswersCard from "./AnswerCard";
import { IconButton, Paper, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { tooltipClasses } from "@mui/material/Tooltip";
import Grid from "@mui/material/Unstable_Grid2";

export default function MatchingContainer({
  answers,
  setAnswers,
  setCorrectAnswer,
  type,
}) {
  const [counter, setCounter] = React.useState(5);
  const [isDeleted, setDeleted] = React.useState(false);
  const [options, setOptions] = React.useState([
    {
      option: 1,
      key: 0,
    },
    {
      option: 2,
      key: 1,
    },
    {
      option: 3,
      key: 2,
    },
    {
      option: 4,
      key: 3,
    },
    {
      option: 5,
      key: 4,
    },
  ]);

  const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: counter === 4 ? "#d50000" : "#000000",
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: counter === 4 ? "#d50000" : "#000000",
    },
  }));
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
    setTimeout(() => {
      setOptions(options.filter((item) => item.key !== key));
      setAnswers(answers.filter((item) => item.key !== key));
      setCounter(counter - 1);
    }, 800);
  };
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
  const addAnswer = (answer) => {
    const newArr = answers
      .filter((item) => item.key !== answer.key)
      .map((item) => item);
    setAnswers([...newArr, answer]);
  };
  return (
    <Stack
      direction='column'
      spacing={2}
      justifyContent='center'
      alignItems='center'
    >
      <Grid
        container
        spacing={2}
        sx={{
          marginTop: 10,
          marginInline: 1,

          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        {options.map((option) => {
          <Grid
            key={option.key}
            xs={12}
            sm={6}
            lg={12 / counter}
            sx={{ position: "relative" }}
          >
            <AnswersCard
              index={option.key + 1}
              onDelete={deleteOption}
              option={option}
              counter={counter}
              setDeleted={(e) => setDeleted(e)}
              isDeleted={isDeleted}
              addAnswer={addAnswer}
            />
          </Grid>;
        })}

        <BootstrapTooltip
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
        </BootstrapTooltip>
      </Grid>
    </Stack>
  );
}
