import React, { useEffect, useState } from "react";

import { Grid, Box, Alert } from "@mui/material";
import "animate.css";
import GeneratePanel from "../components/GeneratePanel";
import InserPanel from "../components/InsertPanel";
import { useSelector } from "react-redux";
import InsertWindow from "../container/TestInsertWindow";
import GenerateWindow from "../container/TestGenerateWindow";
import { styled } from "@mui/styles";
import Switcher from "../components/Switcher";
import { Navigate, useParams } from "react-router-dom";
import TestWindow from "./TestWindow";

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
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [test, setTest] = useState(null);
  const [openTest, setOpenTest] = useState(false);
  const openWindow = () => {
    if (open === "insert" && swt === "create") {
      return (
        <InsertWindow
          setMessage={setMessage}
          setData={setData}
          questionData={data}
          test={test}
        />
      );
    } else if (open === "generate" && swt === "generate") {
      return <GenerateWindow />;
    } else return;
  };

  useEffect(() => {
    if (message !== "") {
      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
    if (error !== "") {
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  }, [data, message, error]);

  return (
    <BoxContainer>
      {message.length !== 0 && (
        <Alert
          sx={{ marginBottom: 2 }}
          severity='success'
          className='animate__animated animate__fadeInDown'
        >
          {message}
        </Alert>
      )}
      {error.length !== 0 && (
        <Alert
          sx={{ marginBottom: 2 }}
          severity='error'
          className='animate__animated animate__fadeInDown'
        >
          {error}
        </Alert>
      )}
      <Grid container justifyContent={isVisible && "space-between"} spacing={1}>
        {!isFull && (
          <Grid
            item
            xs={12}
            sm={6}
            md={isVisible ? 2.5 : 3}
            style={{ paddingInline: 10, paddingBottom: 25 }}
            overflow='hidden'
          >
            {<Switcher navigation={props.navigation} />}
            {swt === "generate" ? (
              <GeneratePanel />
            ) : swt === "create" ? (
              <InserPanel
                setError={setError}
                setTest={setTest}
                test={test}
                setMessage={setMessage}
                setOpenTest={setOpenTest}
              />
            ) : (
              <Navigate to='*' />
            )}
          </Grid>
        )}

        {isVisible && openWindow()}
        {openTest && <TestWindow test={test}/>}
      </Grid>
    </BoxContainer>
  );
};

export default Home;
