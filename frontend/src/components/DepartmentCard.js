import React from "react";
import { Paper, Box, Typography, Tooltip, IconButton } from "@mui/material";
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
          <Tooltip
            title={
              department.Users.length !== 0 ||
              department.Questions.length !== 0 ||
              department.Tests.length !== 0
                ? "This department has dependencies, You cannot delete it!"
                : ""
            }
            arrow
            placement='top'
          >
            <Box>
              <IconButton
                onClick={() => onDelete(department.id)}
                disabled={
                  department.Users.length !== 0 ||
                  department.Questions.length !== 0 ||
                  department.Tests.length !== 0
                }
              >
                <FontAwesomeIcon
                  icon={faTrash}
                  color={
                    department.Users.length !== 0 ||
                    department.Questions.length !== 0 ||
                    department.Tests.length !== 0
                      ? "#c8c8c8"
                      : "red"
                  }
                />
              </IconButton>
            </Box>
          </Tooltip>
        )}
      </Box>
    </Paper>
  );
};

export default DepartmentCard;
