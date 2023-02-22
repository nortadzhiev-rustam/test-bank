import React, { useEffect } from "react";
import { Button } from "@mui/material";

const colors = ["error", "success", "secondary", "warning", "primary", "info"];

export default function SelctableButton({ item, setSelected, selected }) {
  const [clicked, setClicked] = React.useState(false);
  const handleSelect = () => {
    setSelected(item);
  };
  const gtRndNmbr = React.useMemo(() => {
    const getRandomNumber = () => {
      return Math.floor(Math.random() * 6);
    };
    return getRandomNumber();
  }, []);

  useEffect(() => {
    if (selected !== undefined) {
      if (selected.id === item.id) setClicked(true);
      else setClicked(false);
    } else setClicked(false);
  }, [setSelected, selected, item]);

  return (
    <Button
      color={colors[gtRndNmbr]}
      variant={clicked ? "contained" : "outlined"}
      size='small'
      onClick={handleSelect}
      sx={{ borderRadius: 10, ml: 2, marginBottom: 2, width: 90, fontSize: 10 }}
    >
      {item.name}
    </Button>
  );
}
