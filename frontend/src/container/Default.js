import React from "react";

import CardComponent from "../components/CardComponent";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import Slider from "../components/CardSlider";

const Default = () => {
  const departments = useSelector((state) => state.department.department);
  const options = [
    { name: "Create" },
    { name: "Generate" },
    { name: "Past Papers" },
  ];
  return (
    <Box sx={{ padding: 10 }}>
      <Typography variant='h4'>SUBJECTS</Typography>
      <Box sx={{ marginBottom: 10 }}>
        <Slider items={departments} />
      </Box>
      <Typography variant='h4'>OPTIONS</Typography>
      <Box>
        <Box
          sx={{
            display: "inline-flex",
            justifyContent: "space-around",
            padding: 2,
          }}
        >
          {options.map((option, idx) => (
            <CardComponent
              key={idx + 1}
              item={option}
              width={300}
              height={400}
              top={300}
              route={
                `/test/${option.name.toLowerCase()}`
              }
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Default;
