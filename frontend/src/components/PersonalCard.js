import * as React from "react";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import { PropTypes } from "prop-types";

export default function PersonalCard({ user }) {
  const { firstName, lastName, department, email, createdAt } = user;
const newDate = new Date(createdAt);
  return (
    <Card elevation={4} sx={{ marginBlock: 5, borderRadius: 3 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
            {firstName.charAt(0) + lastName.charAt(0)}
          </Avatar>
        }
        action={
          <IconButton aria-label='settings'>
            <MoreVertIcon />
          </IconButton>
        }
        title={firstName + " " + lastName}
        subheader={`Member since: ${newDate.toUTCString()}`}
      />

      <CardContent sx={{ paddingLeft: 9 }}>
        <Typography>Department: {department.name}</Typography>
        <Typography>Email: {email}</Typography>
      </CardContent>
    </Card>
  );
}
