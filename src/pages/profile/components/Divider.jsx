import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import { useColorScheme } from "@mui/material";

const Divider = () => {
  const { mode } = useColorScheme();

  const dividerStyle = {
    width: "100%",
    height: "1px",
    backgroundColor: mode == "light" ? "black" : "white",
  };

  return <Box style={dividerStyle}></Box>;
};

Divider.propTypes = {
  mode: PropTypes.string,
};

export default Divider;
