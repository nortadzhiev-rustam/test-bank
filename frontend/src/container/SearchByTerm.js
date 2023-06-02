import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  FormGroup,
  Checkbox,
  Stack,
  ButtonBase,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap, faListUl } from "@fortawesome/free-solid-svg-icons";
import SearchQuestionView from "../components/SearchQuestionView";
const SearchPage = ({ showNav, setShowNav }) => {
  const [state, setState] = useState({
    gilad: true,
    jason: false,
    antoine: false,
  });
  const [expanded, setExpanded] = useState(false);
  const [hoveredTest, setHoveredTest] = useState(null);
  const [tests, setTests] = useState([]);
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();
  const { name } = useParams();

  useEffect(() => {
    axios
      .get("https://backend.rustamnortadzhiev.com/api/v1/tests")
      .then((res) => {
        setTests(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleExpandChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
    setExpanded(true);
  };
  useEffect(() => {
    setExpanded("panel1");
  }, []);
  const { gilad, jason, antoine } = state;

  useEffect(() => {
    if (showNav === false) setShowNav(true);
    document.title = "Test Generator";
  }, [showNav, setShowNav]);

  const filterArrayByName = (array, input) => {
    return array.filter((obj) =>
      obj.name.toLowerCase().includes(input.toLowerCase())
    );
  };

  useEffect(() => {
    filterArrayById(tests, hoveredTest).forEach((test) => {
      setQuestions(test.questions);
    });
  }, [tests, hoveredTest]);

  const filterArrayById = (array, input) => {
    return array.filter((obj) => obj.id === input);
  };

  const handleHover = (testId) => {
    setHoveredTest(testId);
  };

  return (
    <Box p={2} height='85vh' width='100%' pt={10}>
      <Grid pl={2} container spacing={2}>
        {/* Filter column */}
        <Grid
          xs={12}
          lg={2}
          mr={1}
          bgcolor='#fff'
          borderRadius={2}
          display={{ xs: "none", lg: "flex" }}
          flexDirection='column'
          p={0}
        >
          <Typography m={2} variant='body1' fontWeight='bold' color='#006064'>
            Filters
          </Typography>
          <Divider sx={{ marginBottom: 2 }} />
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleExpandChange("panel1")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <Typography>No. of questions</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={gilad}
                      onChange={handleChange}
                      name='gilad'
                    />
                  }
                  label='1-10'
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={jason}
                      onChange={handleChange}
                      name='jason'
                    />
                  }
                  label='11-20'
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={antoine}
                      onChange={handleChange}
                      name='antoine'
                    />
                  }
                  label='21-30'
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={antoine}
                      onChange={handleChange}
                      name='antoine'
                    />
                  }
                  label='30+'
                />
              </FormGroup>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleExpandChange("panel2")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel2bh-content'
              id='panel2bh-header'
            >
              <Typography sx={{ flexShrink: 0 }}>Type of questions</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Donec placerat, lectus sed mattis semper, neque lectus feugiat
                lectus, varius pulvinar diam eros in elit. Pellentesque
                convallis laoreet laoreet.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel3"}
            onChange={handleExpandChange("panel3")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel3bh-content'
              id='panel3bh-header'
            >
              <Typography sx={{ flexShrink: 0 }}>Subjects</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Nunc vitae orci ultricies, auctor nunc in, volutpat nisl.
                Integer sit amet egestas eros, vitae egestas augue. Duis vel est
                augue.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel4"}
            onChange={handleExpandChange("panel4")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel4bh-content'
              id='panel4bh-header'
            >
              <Typography sx={{ flexShrink: 0 }}>Grades</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Nunc vitae orci ultricies, auctor nunc in, volutpat nisl.
                Integer sit amet egestas eros, vitae egestas augue. Duis vel est
                augue.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>

        {/* Found column */}
        <Grid xs={12} lg={4} mr={1} borderRadius={2} p={0}>
          <Box bgcolor='#fff'  p={1}>
            <Typography variant='body1' fontWeight='bold'>
              {filterArrayByName(tests, name).length}{" "}
              {filterArrayByName(tests, name).length > 1 ||
              filterArrayByName(tests, name).length === 0
                ? "Results"
                : "Result"}
            </Typography>
          </Box>
          <Box sx={{ overflowY: "scroll" }}>
            {filterArrayByName(tests, name).map((test) => (
              <Stack
                direction='row'
                spacing={1}
                bgcolor='#fff'
                mb={1}
                padding={1}
                borderRadius={2}
                sx={{ cursor: "pointer", "&:hover": { boxShadow: 1 } }}
                component={ButtonBase}
                justifyContent='flex-start'
                width='100%'
                key={test.id}
                onClick={() => {
                  navigate(`/admin/test/${test.id}/${test.name}}`);
                }}
                onMouseEnter={() => handleHover(test.id)}
              >
                <Box width={100} height={100}>
                  <img
                    width='100%'
                    src={process.env.PUBLIC_URL + "/uploads/" + test.image}
                    alt={test.name}
                  />
                </Box>
                <Stack direction='column' spacing={1} alignItems='flex-start'>
                  <Typography variant='body1' fontWeight='bold'>
                    {test.name}
                  </Typography>
                  <Stack direction='row' spacing={1} alignItems='center'>
                    <Stack direction='row' spacing={1} alignItems='center'>
                      <FontAwesomeIcon icon={faListUl} />
                      <Typography variant='body2'>
                        {test.questions.length} questions
                      </Typography>
                    </Stack>
                    <Stack direction='row' spacing={1} alignItems='center'>
                      <FontAwesomeIcon icon={faGraduationCap} />
                      <Typography variant='body2'>
                        {test.grade}
                        {test.garde > 3
                          ? "th Grade"
                          : test.grade === 1
                          ? "st Grade"
                          : test.grade === 2
                          ? "nd Grade"
                          : test.grade === 3
                          ? "rd Grade"
                          : "th Grade"}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            ))}
          </Box>
        </Grid>

        {/* View column */}
        <Grid
          xs={12}
          lg={5.75}
          mr={1}
          pr={1}
          bgcolor='#fff'
          borderRadius={2}
          display={{ xs: "none", lg: "flex" }}
          sx={{ flexDirection: "column" }}
          height='90vh'
          overflow='auto'
        >
          <Box width='100%'>
            <Typography variant='body1' fontWeight='bold'>
              Preview
            </Typography>

          </Box>
          {/* Add your view component here */}
          {hoveredTest && ( // if selectedTest is not null
            <Box
              sx={{
                

                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                overflowY: "auto",
                mt: 2,
                p: 1,
              }}
            >
              {questions.map((question) => (
                <SearchQuestionView key={question.id} data={question} />
              ))}
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default SearchPage;
