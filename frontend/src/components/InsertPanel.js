import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  TextField,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import "animate.css";
import { useSelector, useDispatch } from "react-redux";
import {
  questCategory,
  questDifficulty,
  questType,
  grade,
  openWindow,
  setVisible,
  setFull,
} from "../store/questionTypeSlice";
import uuid from "react-uuid";
import { useNavigate } from "react-router-dom";
import SelctableButton from './SelctableButton';
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

const difficulties = ["Easy", "Medium", "Hard", "Challenge"];
const types = ["Multiple choice", "True or Flase", "Fill in gaps", "Classic"];
const grades = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const InsertPanel = ({ setMessage, setTest, setError, test, setOpenTest }) => {
  const [isMouseIn, setMouseIn] = React.useState(false);
  const [testName, setTestName] = React.useState("");
  const [selectedDepartment, setSelectedDepartment]= React.useState({})
  const quest = useSelector((state) => state.questionsType.value);
  const category = useSelector((state) => state.department.department);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleVisibility = () => {
    if (quest.category !== "") {
      dispatch(setVisible(true));
      dispatch(openWindow("insert"));
      dispatch(setFull(true));

      setOpenTest(false);
    } else {
      dispatch(setVisible(false));
    }
  };
  const handleChangeCategory = (event) => {
    dispatch(questCategory(event.target.value));
  };
  const handleChangeDifficulty = (event) => {
    dispatch(questDifficulty(event.target.value));
  };

  const handleChangeType = (event) => {
    dispatch(questType(event.target.value));
  };

  const handleChangeGarde = (event) => {
    dispatch(grade(Number(event.target.value)));
  };

  const createTest = async () => {
    const data = {
      id: uuid(),
      name: testName,
      userId: user.id,
      departmentId: selectedDepartment.id,
    };
    try {
      const req = await axios.post("http://localhost:5000/api/v1/test", data);
      if (req.status === 500) {
        setError(req.data.message);
      }
      setMessage(req.data.message);
      setTest(req.data.test);
      setOpenTest(true);
      setTestName("");
      navigate(`/test/create/editor/${data.id}`);
    } catch (err) {
      setError("Something went wrong", err);
    }
  };

  return (
    <Item
      elevation={isMouseIn ? 10 : 2}
      onMouseEnter={() => setMouseIn(true)}
      onMouseLeave={() => setMouseIn(false)}
      className='animate__animated animate__fadeInRight'
    >
      {test !== undefined && test !== null ? (
        <div style={{ overflow: "hidden" }}>
          <FormControl size='small' fullWidth style={{ marginBlock: 20 }}>
            <InputLabel id='demo-simple-select-label'>Category</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='category'
              value={quest.category || ""}
              label='Category'
              onChange={handleChangeCategory}
            >
              {category.map((item, idx) => {
                return (
                  <MenuItem key={idx} value={item}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          {quest.category !== "" && (
            <div className='animate__animated animate__fadeInUp'>
              <FormControl size='small' fullWidth style={{ marginBottom: 20 }}>
                <InputLabel id='demo-simple-select-label'>Type</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='type'
                  value={quest.questionType}
                  label='Difficulty'
                  onChange={handleChangeType}
                >
                  {types.map((tp, idx) => {
                    return (
                      <MenuItem key={idx} value={tp.toLowerCase()}>
                        {tp}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
          )}
          {quest.questionType !== "" && (
            <div className='animate__animated animate__fadeInUp'>
              <FormControl size='small' fullWidth style={{ marginBottom: 20 }}>
                <InputLabel id='demo-simple-select-label'>
                  Difficulty
                </InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='difficulty'
                  value={quest.difficulty}
                  label='Difficulty'
                  onChange={handleChangeDifficulty}
                >
                  {difficulties.map((dif, idx) => {
                    return (
                      <MenuItem key={idx} value={dif.toLowerCase()}>
                        {dif}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
          )}

          {quest.difficulty !== "" && (
            <FormControl
              component='fieldset'
              className='animate__animated animate__fadeInUp'
            >
              <FormLabel component='legend'>Grades</FormLabel>
              <RadioGroup
                value={quest.grade}
                onChange={handleChangeGarde}
                row
                aria-label='gender'
                name='row-radio-buttons-group'
              >
                {grades.map((grd, idx) => {
                  return (
                    <FormControlLabel
                      key={idx}
                      value={grd}
                      control={<Radio color={"info"} />}
                      label={grd}
                      labelPlacement='start'
                    />
                  );
                })}
              </RadioGroup>
            </FormControl>
          )}
        </div>
      ) : (
        <div>
          <TextField
            fullWidth
            label='Test name'
            sx={{ marginBottom: 2 }}
            onChange={(e) => setTestName(e.target.value)}
          />

          <div
            style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
          >
            {category.map((item, idx) => (
              <SelctableButton key={idx} item={item} setSelected={setSelectedDepartment}/>
            ))}
          </div>
        </div>
      )}
      {test !== null && test !== undefined ? (
        <Button
          disabled={quest.grade === 0 ? true : false}
          variant='contained'
          color='info'
          onClick={handleVisibility}
        >
          Insert
        </Button>
      ) : (
        <Button
          fullWidth
          variant='contained'
          color='info'
          onClick={() =>
            testName.trim() !== "" ? createTest() : setError("Input is empty")
          }
        >
          Submit
        </Button>
      )}
    </Item>
  );
};

export default InsertPanel;
