import React from "react";
import { Typography, Box, Button } from "@mui/material";

const Hero = ({ name, role }) => (
  <Box
    sx={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #ff4081 0%, #673ab7 100%)",
      color: "white",
      textAlign: "center",
    }}
  >
    <Typography variant="h2" sx={{ mb: 2 }}>{name}</Typography>
    <Typography variant="h5" sx={{ mb: 4 }}>{role}</Typography>
    <Button variant="contained" color="secondary" size="large">
      View My Work
    </Button>
  </Box>
);

export default Hero;
