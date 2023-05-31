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
const SearchPage = ({ showNav, setShowNav }) => {
  const [state, setState] = useState({
    gilad: true,
    jason: false,
    antoine: false,
  });
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
      
    });
    setExpanded(true);
  };
  useEffect(() => {
    setExpanded(true);
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
          <Accordion expanded={expanded} onClick={() => setExpanded(!expanded)}>
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
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel2a-content'
              id='panel2a-header'
            >
              <Typography>Question types</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <Typography>Subjects</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel2a-content'
              id='panel2a-header'
            >
              <Typography>Grades</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
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
