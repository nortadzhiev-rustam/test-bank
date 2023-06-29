import * as React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { BlockMath } from "react-katex";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
      style={{ minHeight: 300 }}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function FormulaTabs({ formulas, mathFieldRef }) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleButtonClick = (value) => {
    mathFieldRef.current.focus();
    mathFieldRef.current.write(value);
  };
  return (
    <Box sx={{ bgcolor: "background.paper", width: 500 }}>
      <AppBar position='static'>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor='secondary'
          textColor='inherit'
          variant='fullWidth'
          aria-label='full width tabs example'
          sx={{ bgcolor: "#006d77" }}
        >
          <Tab
            sx={{ textTransform: "capitalize" }}
            label='Basic'
            {...a11yProps(0)}
          />
          <Tab
            sx={{ textTransform: "capitalize" }}
            label='Greek'
            {...a11yProps(1)}
          />
          <Tab
            sx={{ textTransform: "capitalize" }}
            label='Advanced'
            {...a11yProps(2)}
          />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          {formulas
            .filter((item) => item.type === "basic")
            .map((formula) => (
              <Box
                key={formula.id}
                component={Button}
                bgcolor='inherit'
                variant='contained'
                textTransform='lowercase'
                ml={2}
                mt={2}
                sx={{
                  color: "black",
                  fontSize: "0.6rem",
                  height: 35,
                  minWidth: 5,
                  maxWidth: 35,
                  "&:hover": {
                    color: "white",
                  },
                }}
                onClick={() => handleButtonClick(formula.latex)}
              >
                <BlockMath math={formula.formula} />
              </Box>
            ))}
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          {formulas
            .filter((item) => item.type === "greek")
            .map((formula) => (
              <Box
                key={formula.id}
                component={Button}
                bgcolor='inherit'
                variant='contained'
                textTransform='lowercase'
                ml={2}
                mt={2}
                sx={{
                  color: "black",
                  fontSize: "1rem",
                  height: 35,
                  minWidth: 5,
                  maxWidth: 35,
                  "&:hover": {
                    color: "white",
                  },
                }}
                onClick={() => handleButtonClick(formula.latex)}
              >
                <BlockMath math={formula.formula} />
              </Box>
            ))}
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          {formulas
            .filter((item) => item.type === "advanced")
            .map((formula) => (
              <Box
                key={formula.id}
                component={Button}
                bgcolor='inherit'
                variant='contained'
                textTransform='lowercase'
                ml={2}
                mt={2}
                sx={{
                  color: "black",
                  fontSize: "0.7rem",
                  height: 35,
                  maxWidth: 5,
                }}
                onClick={() => handleButtonClick(formula.latex)}
              >
                <BlockMath math={formula.formula} />
              </Box>
            ))}
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}
