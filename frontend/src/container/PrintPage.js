import React, { Fragment, useRef, useEffect, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { useParams } from "react-router-dom";
import axios from "axios";
import QuestionPrintView from "../components/QuestionPrintView";
import { Stack } from "@mui/material";
const PrintPage = ({ showNav, setShowNav }) => {
  const [data, setData] = useState({});
  const [message, setMessage] = useState("");
  const componentRef = useRef(null);
  const { id } = useParams();

  useEffect(() => {
    if (showNav) {
      setShowNav(false);
    }
  }, [showNav]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/test/${id}`)
      .then((res) => {
        if (res.status == 200) {
          setData(res.data);
        }
      })
      .catch((err) => console.log(err.message));

    return () => {
      setData({});
    };
  }, []);

  const handlePrint = useReactToPrint({
    content: componentRef.current,
    documnetTitle: data.name,
    onAfterPrint: () => setMessage("Successfully printed"),
  });

  const { questions } = data;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        backgroundColor: "#f2f2f2",
      }}
    >
      <Stack
        style={{
          width: "816px",
          height: window.innerHeight,
          backgroundColor: "#ffffff",
          padding: 60,
        }}
        ref={componentRef}
      >
        {questions &&
          questions.map((question, idx) => (
            <QuestionPrintView quest={question} number={idx + 1} />
          ))}
      </Stack>
    </div>
  );
};

export default PrintPage;
