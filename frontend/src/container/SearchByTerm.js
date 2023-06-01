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
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
const SearchPage = ({ showNav, setShowNav }) => {
  const [state, setState] = useState({
    gilad: true,
    jason: false,
    antoine: false,
    
  });
  const [expanded, setExpanded] = useState(false);
  const [tests, setTests] = useState([]);
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

  return (
    <Box p={2} height='88vh' width='100%' mt={10}>
      <Grid pl={2} container spacing={2} height='100%'>
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
          <Divider sx={{ marginBottom: 2 }} fullWidth />
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
        <Grid xs={12} lg={4} mr={1} bgcolor='#fff' borderRadius={2}></Grid>

        {/* View column */}
        <Grid
          xs={12}
          lg={5.75}
          mr={1}
          bgcolor='#fff'
          borderRadius={2}
          display={{ xs: "none", lg: "flex" }}
        >
          {/* Add your view component here */}
        </Grid>
      </Grid>
    </Box>
  );
};

export default SearchPage;
