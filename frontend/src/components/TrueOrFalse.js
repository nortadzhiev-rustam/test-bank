import { Stack, Box, Typography } from "@mui/material";
import React from "react";

export default function TrueOrFalse({
  answers,
  setAnswers,
  setCorrectAnswer,
  correctAnswer,
}) {
  const [clicked, setClicked] = React.useState(false);
  const [selected, setSelected] = React.useState("");
  const options = React.useMemo(() => [
    { content: { text: "True" }, key: 0 },
    { content: { text: "Flase" }, key: 1 },
  ],[]);

  const handleClick = (item) => {
    setClicked(true);
    setSelected(item.key);
    setCorrectAnswer(item);
  };

  React.useEffect(() => {
    setAnswers(options);
    return () => {
      setAnswers();
    };
  }, [setAnswers, options]);

  return (
    <div>
      <Stack
        mt={5}
        width='100%'
        direction='row'
        spacing={2}
        justifyContent='center'
      >
        {options.map((item) => (
          <Stack
            component={Box}
            alignItems='center'
            justifyContent='center'
            width='100%'
            height={{ xs: 150, md: 300 }}
            key={item.key}
            bgcolor={
              (clicked && selected === item.key) ||
              correctAnswer.key === item.key
                ? "#006460"
                : "#f2f2f2"
            }
            color={
              (clicked && selected === item.key) ||
              correctAnswer.key === item.key
                ? "#ffffff"
                : "#000000"
            }
            borderRadius={4}
            boxShadow={10}
            onClick={() => handleClick(item)}
            sx={{
              transition: "all 0.3s ease-in",
              "&:hover": {
                boxShadow: 0,
                transform: "translateY(5px)",
              },
              cursor: "pointer",
            }}
          >
            <Typography variant='h4'>{item.content.text}</Typography>
          </Stack>
        ))}
      </Stack>
    </div>
  );
}
