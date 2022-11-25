import React, { useState } from "react";
import { Stack, TextField } from "@mui/material";
import AnswersCard from "./AnswerCard";
import { IconButton, Paper, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { tooltipClasses } from "@mui/material/Tooltip";
import Grid from "@mui/material/Unstable_Grid2";

export default function Match({answers, setAnswers, setCorrectAnswer}) {
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
