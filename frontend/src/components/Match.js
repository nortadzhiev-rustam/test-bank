import React, { useState } from "react";
import {
  Stack,
  InputBase,
  Typography,
  IconButton,
  Paper,
  Tooltip,
} from "@mui/material";
import AnswersCard from "./AnswerCard";

import { styled } from "@mui/material/styles";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { tooltipClasses } from "@mui/material/Tooltip";
import Grid from "@mui/material/Unstable_Grid2";

export default function Match({ answers, setAnswers, setCorrectAnswer, type,matches, setMatches }) {
  const [counter, setCounter] = React.useState(4);
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
  ]);
  const [isDeleted, setDeleted] = useState(false);
  
  const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: counter === 5 ? "#d50000" : "#000000",
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: counter === 5 ? "#d50000" : "#000000",
    },
  }));

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

  const getRandomOption = () => {
    const set = new Set();
    let randomNumber = Math.floor(Math.random() * 5) + 1;
    options.forEach((item) => {
      set.add(item.option);
    });
    while (set.has(randomNumber)) {
      randomNumber = Math.floor(Math.random() * 5) + 1;
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

  const handleMatch = (event, id) => {
    const newArr = matches
      .filter((match) => match.id !== id)
      .map((item) => item);
    setMatches([...newArr, { match: event.target.value, id: id }]);
  };

  const deleteOption = (key) => {
    setTimeout(() => {
      setOptions(options.filter((item) => item.key !== key));
      setAnswers(answers.filter((item) => item.key !== key));
      setCounter(counter - 1);
    }, 800);
  };

  //add answers to the array if previous answer key is same as the current answer key then replace the answer
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
      mb={10}
      height={400}
    >
      <Grid
        container
        spacing={2}
        sx={{
          marginTop: 10,
          mr: 2,
        }}
      >
        {options.map((option, idx) => (
          <Grid key={option.key} xs={12 / counter} height={400}>
            <Stack
              spacing={2}
              justifyContent='flex-end'
              height={400}
              width='95%'
              overflow='hidden'
              px={2}
            >
              <AnswersCard
                index={option.key + 1}
                onDelete={deleteOption}
                option={option}
                counter={counter}
                setDeleted={(e) => setDeleted(e)}
                isDeleted={isDeleted}
                addAnswer={addAnswer}
                type={type}
                height={200}
                answer={answers[option.key]}
              />

              <Stack
                bgcolor={getRandomColor(option.option)}
                direction='row'
                spacing={2}
                alignItems='center'
                justifyContent='center'
                p={1}
                px={2}
                borderRadius={2}
              >
                <Typography color='white'>{idx + 1}</Typography>
                <InputBase
                  sx={{
                    color: "white",
                    bgcolor: "rgba(255,255,255,0.1)",
                    borderRadius: 2,
                    padding: 1,
                  }}
                  onChange={(e) => handleMatch(e, option.key)}
                  variant='filled'
                  multiline
                />
              </Stack>
            </Stack>
          </Grid>
        ))}

        <BootstrapTooltip
          placement='left'
          arrow
          title={counter === 5 ? "You can not add more then five options" : ""}
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
            <IconButton disabled={counter === 5} onClick={addOption}>
              <FontAwesomeIcon
                size='2x'
                icon={faPlusCircle}
                color={counter !== 5 ? "#006064" : undefined}
              />
            </IconButton>
          </Paper>
        </BootstrapTooltip>
      </Grid>
    </Stack>
  );
}
