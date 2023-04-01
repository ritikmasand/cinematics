import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';

import React from 'react'
import useLocalStorage from "use-local-storage";
import FavouriteMovie from '../components/FavouriteMovie';
function Home() {
    const [favourites] = useLocalStorage("favourite", "[]");
  return (
    <div>
      <Box P={2}>
        <Typography variant="h4" textAlign={"center"}>
          Welcome to my collection
        </Typography>
        <Grid container spacing={2} padding={3} mt={4} alignItems="center" sx={{
       
        }}>
          {JSON.parse(favourites).map((e, i) => {
            return <FavouriteMovie id={e} key={i} />;
          })}
        </Grid>
      </Box>
    </div>
  );
}

export default Home
