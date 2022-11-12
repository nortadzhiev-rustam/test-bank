import React from "react";
import { Button } from "@mui/material";

export default function SelctableButton({ item, setSelected }) {
  const [clicked, setClicked] = React.useState(false);
  const handleSelect = () => {
    setSelected(item);
    setClicked(!clicked);
  };
  return (
    <Button
      variant={clicked ? "contained" : "outlined"}
      size='small'
      onClick={handleSelect}
      sx={{ borderRadius: 10, ml: 2, marginBottom: 2 }}
    >
      {item.name}
    </Button>
  );
}
