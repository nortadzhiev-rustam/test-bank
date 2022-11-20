import React from "react";
import { TextField, Stack, CircularProgress } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import "animate.css";
import { useSelector } from "react-redux";

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

const InsertPanel = ({ setOpen, name, department, isEditing, setEditing }) => {
  const [testName, setTestName] = React.useState("");
  const [selectedDepartment, setSelectedDepartment] = React.useState(undefined);
  const [isLoading, setLoading] = React.useState(false);
  const category = useSelector((state) => state.department.department);
  const user = useSelector((state) => state.user.user.user);
  const navigate = useNavigate();
  const { id } = useParams();
  React.useEffect(() => {
    setTestName(name);
    setSelectedDepartment(department);
  }, [department, name]);

  const createTest = async () => {
    setLoading(true);
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
        setLoading(false);
        navigate(`/test/editor/${data.id}/edit`);
        setOpen(false);
      }
    } catch (err) {
      console.log("Something went wrong", err);
    }
  };

  const updateSettings = async () => {
    setLoading(true);
    try {
      const res = await axios.put(
        `http://localhost:5000/api/v1/test/${id}?name=${testName}&departmentId=${selectedDepartment.id}`
      );
      setEditing(false);
      setTimeout(() => {
        setLoading(false);
        setOpen(false);
      }, 500);

      
      console.log(res.data.message);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Item elevation={0} className='animate__animated animate__fadeInRight'>
      <div>
        <TextField
          value={testName}
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
      <Stack direction='row' spacing={2} justifyContent='center'>
        <Button
          fullWidth
          variant='contained'
          color='error'
          onClick={() => setOpen(false)}
        >
          Cancel
        </Button>
        <Button
          fullWidth
          variant='contained'
          disabled={
            (testName === "" && selectedDepartment !== undefined) || isLoading
          }
          color='info'
          onClick={!isEditing ? () => createTest() : () => updateSettings()}
        >
          {isLoading ? (
            <CircularProgress size={24} color='success' />
          ) : (
            "Submit"
          )}
        </Button>
      </Stack>
    </Item>
  );
};

export default InsertPanel;
