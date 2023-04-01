import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <Box>
      <Stack alignItems={'center'} mt={20} mb={20}>
        <Typography variant="h3">Notfound </Typography>
        <Link to={"/"}> Go to home</Link>
      </Stack>
    </Box>
  );
}

export default NotFound
