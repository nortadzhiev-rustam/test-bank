import React, { useEffect } from "react";
import { Button } from "@mui/material";

export default function SelctableButton({ item, setSelected, selected }) {
  const [clicked, setClicked] = React.useState(false);
  const handleSelect = () => {
    setSelected(item);
  };

  useEffect(() => {
    if (selected !== undefined) {
      if (selected.id === item.id) setClicked(true);
      else setClicked(false);
    } else setClicked(false);
  }, [setSelected, selected, item]);

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
