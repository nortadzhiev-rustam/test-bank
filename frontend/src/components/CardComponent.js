import React from "react";
import Card from "@mui/material/Card";

import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { CardActionArea, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { withRouter } from "./withRouter";

const CardComponent = (props) => {
  const history = useNavigate();
  const { name } = props.item;
  const {  route } = props;
  const [mouseIn, setMouseIn] = React.useState(false);
  const photoSelector = (title) => {
    switch (title) {
      case "Mathematics":
        return require("../subjects/Mathematics.png");

      case "History":
        return require("../subjects/History.png");

      case "ICT":
        return require("../subjects/Computer.png");

      case "Physics":
        return require("../subjects/Physics.png");

      case "Chemistry":
        return require("../subjects/Chemistry.png");

      case "Biology":
        return require("../subjects/Biology.png");

      case "English":
        return require("../subjects/English.png");

      case "French":
        return require("../subjects/French.png");

      case "Art":
        return require("../subjects/Arte.png");

      case "Geography":
        return require("../subjects/Geography.png");

      case "Musica":
        return require("../subjects/Music.png");

      case "Portuguese":
        return require("../subjects/Litrature.png");

      case "Eduçao Laboral":
        return require("../subjects/EVP.png");

      case "EVP":
        return require("../subjects/EVP.png");

      case "EMC":
        return require("../subjects/EMC.png");

      case "Robotics":
        return require("../subjects/Robotics.png");

      default:
        return require("../subjects/English.png");
    }
  };

  return (
    <Card
      onMouseEnter={() => setMouseIn(true)}
      onMouseLeave={() => setMouseIn(false)}
      elevation={mouseIn ? 10 : 2}
      sx={{
        width: "250px",
        marginInline: '10px',
        marginBottom: 2,
        height:'300px',
        borderRadius: 1,
        transition: "all 0.3s ease-in",
      }}
    >
      <CardActionArea onClick={() => history(route || "#")}>
        <CardMedia
          component='img'
          height='auto'
          image={photoSelector(name)}
          alt={name}
        />
        <CardContent>
          <Paper
            elevation={5}
            sx={{
              width: "100%",
              
              left: 0,
              top: 2,
              display: "flex",
              backgroundColor: "#00695f",
              height: "150px",
              justifyContent: "center",
            }}
          >
            <Typography
              gutterBottom
              variant='h5'
              component='div'
              sx={{ marginTop: 1, color: "white" }}
            >
              {name}
            </Typography>
          </Paper>
        </CardContent>
      </CardActionArea>
    </Card>
    
  );
};

export default withRouter(CardComponent);
