import { Box, Typography } from '@mui/material';
import React from 'react'

function Footer() {
  return (
    <>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h4">DEVELOPED BY RITIK MASAND</Typography>
        <a href="https://github.com/" target="_blank" rel="noreferrer">
          <Typography variant='h6'> Source code </Typography>
        </a>
      </Box>
    </>
  );
}

export default Footer
