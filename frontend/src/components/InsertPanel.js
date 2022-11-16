import React from "react";
import { TextField } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import "animate.css";
import { useSelector, useDispatch } from "react-redux";

import uuid from "react-uuid";
import { useNavigate, useParams } from "react-router-dom";
import SelctableButton from "./SelctableButton";
import axios from "axios";


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.caption,
  paddingBlock: theme.spacing(2),
  paddingInline: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: 15,
  transition: "all 0.3s ease-in",
}));

const InsertPanel = ({ setOpen }) => {
  const [testName, setTestName] = React.useState("");
  const [selectedDepartment, setSelectedDepartment] = React.useState({});

  const category = useSelector((state) => state.department.department);
  const user = useSelector((state) => state.user.user.user);
  const navigate = useNavigate();

  const createTest = async () => {
    const data = {
      id: uuid(),
      name: testName,
      userId: user.id,
      departmentId: selectedDepartment.id,
      grade: null,
    };
    try {
      const req = await axios.post("http://localhost:5000/api/v1/test", data);
      if (req.status === 200) {
        setTestName("");
        navigate(`/test/create/editor/${data.id}`);
        setOpen(false);
      }
    } catch (err) {
      console.log("Something went wrong", err);
    }
  };

  return (
    <Item elevation={0} className='animate__animated animate__fadeInRight'>
      <div>
        <TextField
          fullWidth
          label='Test name'
          sx={{ marginBottom: 2 }}
          onChange={(e) => setTestName(e.target.value)}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {category.map((item, idx) => (
            <SelctableButton
              key={idx}
              item={item}
              setSelected={setSelectedDepartment}
              selected={selectedDepartment}
            />
          ))}
        </div>
      </div>

      <Button
        fullWidth
        variant='contained'
        color='info'
        onClick={() => (testName.trim() !== "" ? createTest() : null)}
      >
        Submit
      </Button>
    </Item>
  );
};

export default InsertPanel;
