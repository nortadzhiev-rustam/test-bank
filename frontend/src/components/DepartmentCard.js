import React from "react";
import { Paper, Box, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const DepartmentCard = ({ department, onDelete }) => {
  const [isHover, setIsHover] = React.useState(false);

  return (
    <Paper
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      elevation={5}
      sx={{ width: "90%", marginLeft: 2 }}
    >
      <Box
        display='flex'
        flexDirection='row'
        justifyContent='space-between'
        alignItems='center'
        p={2}
        my={2}
      >
        <Typography>{department.name}</Typography>
        {isHover && (
          <FontAwesomeIcon
            style={{ cursor: "pointer" }}
            onClick={() => onDelete(department.id)}
            icon={faTrash}
            color='red'
          />
        )}
      </Box>
    </Paper>
  );
};

export default DepartmentCard;
