import React, { useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import AnswersCard from "./AnswerCard";
import { IconButton, Paper, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { tooltipClasses } from "@mui/material/Tooltip";

export default function AnswersContainer({
  answers,
  setAnswers,
  setCorrectAnswer,
  type,
  correctAnswer,
  editing,
}) {
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
  //eslint-disable-next-line

  const [isDeleted, setDeleted] = React.useState(false);
  const [checked1, setChecked1] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);
  const [checked3, setChecked3] = React.useState(false);
  const [checked4, setChecked4] = React.useState(false);

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
    setTimeout(() => {
      setOptions(options.filter((item) => item.key !== key));
      setAnswers(answers.filter((item) => item.key !== key));
      setCounter(counter - 1);
    }, 800);
  };

  //add answers to the array if previous answer key is same as the current answer key then replace the answer
  const addAnswer = (answer) => {
    const newArr = answers.filter((item) => item.key !== answer.key);
    newArr.splice(answer.key - 1, 0, answer);
    setAnswers(newArr);
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
    } else {
      setChecked1(false);
      setChecked2(false);
      setChecked3(false);
      setChecked4(false);
    }
  }, [checked1, checked2, checked3, checked4]);

  useEffect(() => {
    const getCorrectAnswer = () => {
      if (checked1) {
        return 1;
      } else if (checked2) {
        return 2;
      } else if (checked3) {
        return 3;
      } else if (checked4) {
        return 4;
      } else {
        return null;
      }
    };

    answers
      .filter((answer) => getCorrectAnswer() === answer.key)
      .forEach((answer) => {
        setCorrectAnswer({});
        setCorrectAnswer(answer);
      });
  }, [checked1, checked2, checked3, checked4, answers, setCorrectAnswer]);

  return (
    <Grid
      container
      spacing={2}
      sx={{
        marginTop: 3,
        marginInline: 1,

        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      {options.map((option, idx) => {
        return (
          <Grid
            key={option.key}
            xs={12}
            sm={6}
            lg={12 / counter}
            sx={{ position: "relative" }}
          >
            <AnswersCard
              index={idx + 1}
              onDelete={deleteOption}
              option={option}
              counter={counter}
              setDeleted={(e) => setDeleted(e)}
              isDeleted={isDeleted}
              isChecked={{
                a: checked1,
                b: checked2,
                c: checked3,
                d: checked4,
              }}
              setChecked={{
                a: setChecked1,
                b: setChecked2,
                c: setChecked3,
                d: setChecked4,
              }}
              addAnswer={addAnswer}
              type={type}
              answers={answers}
              correctAnswer={correctAnswer}
              editing={editing}
            />
          </Grid>
        );
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
  );
}
