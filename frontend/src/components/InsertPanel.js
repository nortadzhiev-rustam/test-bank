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

const InsertPanel = ({
  setOpen,
  name,
  department,
  isEditing,
  setEditing,
  setMessage,
  isOpen,
}) => {
  const [testName, setTestName] = React.useState("");
  const [selectedDepartment, setSelectedDepartment] = React.useState(undefined);
  const [isLoading, setLoading] = React.useState(false);
  const category = useSelector((state) => state.department.department);
  const user = useSelector((state) => state.user.user.user);
  const navigate = useNavigate();
  const { id } = useParams();
  React.useEffect(() => {
    if (name) setTestName(name);
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
      const req = await axios.post(
        `${
          process.env.NODE_ENV === "production"
            ? "https://backend.rustamnortadzhiev.com"
            : "http://localhost:5000"
        }/api/v1/test`,
        data
      );
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
        `${
          process.env.NODE_ENV === "production"
            ? "https://backend.rustamnortadzhiev.com"
            : "http://localhost:5000"
        }/api/v1/test/${id}?name=${testName}&departmentId=${
          selectedDepartment.id
        }`
      );
      setEditing(false);
      setTimeout(() => {
        setLoading(false);
        setOpen(false);
      }, 500);

      setMessage(res.data.message);
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
          size='small'
        />

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "flex-start",
          }}
        >
          {category.map((item) => (
            <SelctableButton
              key={item.id}
              item={item}
              setSelected={setSelectedDepartment}
              selected={selectedDepartment}
              isOpen={isOpen}
            />
          ))}
        </div>
      </div>
      <Stack direction='row' spacing={2} justifyContent='flex-end'>
        <Button
          variant='contained'
          color='error'
          onClick={() => setOpen(false)}
        >
          Cancel
        </Button>
        <Button
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
