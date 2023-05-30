import React, { useRef } from "react";
import "./Default.css";
import { Box, Stack } from "@mui/material";
import CardSlider from "../components/CardSlider";
import MainDepartments from "../components/MainDepartments";
import SearchBar from "../components/SearchBar";
import axios from "axios";
const mainDepartments = [
  { title: "Computers", id: 1 },
  { title: "Maths", id: 2 },
  { title: "Career ed", id: 3 },
  { title: "English", id: 4 },
  { title: "Social Studies", id: 5 },
  { title: "Languages", id: 6 },
  { title: "Science", id: 7 },
  { title: "Creative Arts", id: 8 },
];

const Default = ({ setShowNav, showNav }) => {
  const [name, setName] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  
  const ref = useRef(null);

  React.useEffect(() => {
    if (showNav === false) setShowNav(true);
    document.title = "Test Generator";
  }, [showNav, setShowNav]);

  const handleClose = () => {
    setOpen(false);
    setFocused(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const handleClick = (name) => {
    ref.current.focus();
    setName(name);
    
    console.log(ref.current);
  };

  

  React.useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        handleClose();
        setName("");
      }
    });
  }, []);

  

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",

        paddingTop: { xs: 10, md: 20 },
      }}
    >
      {
        <SearchBar
          name={name}
          setName={setName}
          setFocused={setFocused}
          open={open}
          setOpen={setOpen}
          innerRef={ref}
          focused={focused}
        />
      }
      {!open && (
        <Stack
          className='department-stack'
          overflow='scroll'
          height={200}
          width={{ xs: "85%", md: 650, lg: 850, xl: 1200 }}
          justifyContent={{ xs: "flex-start", lg: "center" }}
          alignItems='center'
          direction='row'
          // display={{ xs: "none", md: "flex" }}
          spacing={3}
          mb={5}
          mt={5}
          p={2}
        >
          {mainDepartments.map((item, idx) => (
            <MainDepartments
              key={item.id}
              name={item.title}
              onClick={handleClick}
            />
          ))}
        </Stack>
      )}
      {/* <Box width='100%' height='100%'>
      <CardSlider />
      </Box> */}
    </Box>
  );
};

export default Default;
