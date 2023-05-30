import React, { useEffect, useState } from "react";
import { Grid, Box, Alert } from "@mui/material";
import "animate.css";
import { useSelector } from "react-redux";
import InsertWindow from "../container/TestInsertWindow";
import GenerateWindow from "../container/TestGenerateWindow";
import { styled } from "@mui/styles";

import TestWindow from "./TestWindow";

const BoxContainer = styled(Box)({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "end",
  marginInline: "2%",
  marginBlock: 100,
});

const Home = (props) => {
  let { swt, id } = useParams();

  const open = useSelector((state) => state.questionsType.isOpen);
  const isVisible = useSelector((state) => state.questionsType.isVisible);
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [test, setTest] = useState(null);
  const [openTest, setOpenTest] = useState(false);
  const [loading, setLoading] = useState(false);
  const openWindow = () => {
    if (open === "insert" && swt === "create") {
      return (
        <InsertWindow
          setMessage={setMessage}
          setData={setData}
          questionData={data}
          test={test}
          setOpenTest={setOpenTest}
        />
      );
    } else if (open === "generate" && swt === "generate") {
      return <GenerateWindow />;
    } else return;
  };

  useEffect(() => {
    let time1, time2;
    if (message !== "") {
      time1 = setTimeout(() => {
        setMessage("");
      }, 2000);
    }
    if (error !== "") {
      time2 = setTimeout(() => {
        setError("");
      }, 2000);
    }

    return () => {
      clearTimeout(time1);
      clearTimeout(time2);
    };
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
        <Grid item xs={12}>
          {isVisible && openWindow()}
          {openTest ||
          (!isVisible && id !== "" && id !== undefined && id !== null) ? (
            <TestWindow
              setOpenTest={setOpenTest}
              open={open}
              test={test}
              setError={setError}
              loading={loading}
              setLoading={setLoading}
              setTest={setTest}
            />
          ) : null}
        </Grid>
      </Grid>
    </BoxContainer>
  );
};

export default Home;
