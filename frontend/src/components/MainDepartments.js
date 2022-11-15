import React from "react";
import { Box, Paper, Typography, Stack, Button } from "@mui/material";
const photoSelector = (title) => {
  switch (title) {
    case "Mathematics":
      return require("../subjects/Mathematics.png");

    case "History":
      return require("../subjects/History.png");

    case "ICT":
      return require("../subjects/Computer.png");

    case "Physics":
      return require("../subjects/Physics.png");

    case "Chemistry":
      return require("../subjects/Chemistry.png");

    case "Biology":
      return require("../subjects/Biology.png");

    case "English":
      return require("../subjects/English.png");

    case "French":
      return require("../subjects/French.png");

    case "Art":
      return require("../subjects/Arte.png");

    case "Geography":
      return require("../subjects/Geography.png");

    case "Musica":
      return require("../subjects/Music.png");

    case "Portuguese":
      return require("../subjects/Litrature.png");

    case "Eduçao Laboral":
      return require("../subjects/EVP.png");

    case "EVP":
      return require("../subjects/EVP.png");

    case "EMC":
      return require("../subjects/EMC.png");

    case "Robotics":
      return require("../subjects/Robotics.png");

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
      onMouseDown={() => setHover(false)}
      onClick={()=>onClick(name)}
      style={{
        cursor: "pointer",
        transition: "transform 0.3s ease-in",
        transform: hover && "scale(1.2)",
      }}
    >
      <Paper
        elevation={hover ? 10 : 2}
        style={{
          height: 120,
          width: 120,
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          border='GrayText'
          bgcolor='#e0fbfc'
          width='85%'
          height='85%'
          borderRadius='50%'
        >
          <img
            width='100%'
            height='100%'
            style={{ objectFit: "cover", borderRadius: "50%" }}
            src={photoSelector(name)}
            alt={name}
          />
        </Box>
      </Paper>
      <Typography
        fontWeight='bold'
        fontSize={22}
        fontFamily='sans-serif'
        color='GrayText'
      >
        {name}
      </Typography>
    </Stack>
  );
}
