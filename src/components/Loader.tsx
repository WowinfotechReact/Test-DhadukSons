import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Backdrop } from "@mui/material";

const Loader = () => {
  const [open, setOpen] = useState(true);

  return (
    <Backdrop
      sx={{
        color: "#00AFEF",
        backgroundColor: "#ffffff40",
        // zIndex: (theme) => theme.zIndex.drawer + 1000,
        zIndex: 2147483647, // 👈 MAX z-index
      }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loader;
