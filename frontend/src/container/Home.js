import React from "react";

import { Grid, Box } from "@mui/material";
import "animate.css";
import GeneratePanel from "../components/GeneratePanel";
import InserPanel from "../components/InsertPanel";
import { useSelector } from "react-redux";
import InsertWindow from "../container/TestInsertWindow";
import GenerateWindow from "../container/TestGenerateWindow";
import { styled } from "@mui/styles";
import Switcher from "../components/Switcher";
import { Navigate, useParams } from "react-router-dom";

const BoxContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  flexGrow: 1,
  flexDirection: "column",
  marginInline: "2%",
  marginBlock: 40,
});

const Home = (props) => {
  let { swt } = useParams();
  const isFull = useSelector((state) => state.questionsType.isFull);
  const open = useSelector((state) => state.questionsType.isOpen);
  const isVisible = useSelector((state) => state.questionsType.isVisible);

  const openWindow = () => {
    if (open === "insert" && swt === "create") {
      return <InsertWindow />;
    } else if (open === "generate" && swt === "generate") {
      return <GenerateWindow />;
    } else return;
  };

  return (
    <BoxContainer>
      <Grid container justifyContent={isVisible && "space-around"} spacing={1}>
        {!isFull && (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={2.5}
            style={{ paddingInline: 20, paddingBottom: 25 }}
            overflow='hidden'
          >
            {
              <Switcher
                
                navigation={props.navigation}
              />
            }
            {swt === "generate" ? (
              <GeneratePanel />
            ) : swt === "create" ? (
              <InserPanel />
            ) : (
              <Navigate to='*' />
            )}
          </Grid>
        )}

        {isVisible && openWindow()}
      </Grid>
    </BoxContainer>
  );
};

export default Home;
