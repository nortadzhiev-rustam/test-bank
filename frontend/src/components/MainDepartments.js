import React from "react";
import { Box, Paper, Typography, Stack } from "@mui/material";

const photoSelector = (title) => {
  switch (title) {
    case "Maths":
      return require("../subjects/Maths.png");
    case "Computers":
      return require("../subjects/Computers.png");
    case "Career ed":
      return require("../subjects/Career Ed.png");
    case "English":
      return require("../subjects/English.png");
    case "Social Studies":
      return require("../subjects/Social Studies.png");
    case "Languages":
      return require("../subjects/Languages.png");
    case "Science":
      return require("../subjects/Science.png");
    case "Creative Arts":
      return require("../subjects/Creative Arts.png");
    default:
      return require("../subjects/English.png");
  }
};
export default function MainDepartments({ name, onClick }) {
  const [hover, setHover] = React.useState(false);
  return (
    <Stack
      component={"div"}
      variant='text'
      direction='column'
      spacing={3}
      justifyContent='center'
      alignItems='center'
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => onClick(name)}
      style={{
        cursor: "pointer",
        transition: "transform 0.5s ease-in",
        transform: hover && "scale(1.5)",
      }}
    >
      <Paper
        elevation={hover ? 10 : 2}
        style={{
          height: 80,
          width: 80,
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          width='100%'
          height='100%'
          style={{ objectFit: "contain", borderRadius: "50%" }}
          src={photoSelector(name)}
          alt={name}
        />
      </Paper>
      <Typography
        fontWeight='bold'
        fontSize={{ xs: 6, lg: 18 }}
        fontFamily='sans-serif'
        color='GrayText'
      >
        {name}
      </Typography>
    </Stack>
  );
}
