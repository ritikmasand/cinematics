import * as React from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Typography from "@mui/material/Typography";

import { Chip } from "@mui/material";
import { Link } from "react-router-dom";

function Singlesearchcard({ data }) {
  return (
    <Card sx={{ display: "flex" }}>
      <Link to={`/detail/${data.imdbID}`}>
        <CardMedia
          component="img"
          sx={{ width: 211 }}
          image={
            data.Poster !== "N/A"
              ? data.Poster
              : "https://www.ncenet.com/wp-content/uploads/2020/04/No-image-found.jpg"
          }
          alt="Live from space album cover"
        />
      </Link>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Link to={`/detail/${data.imdbID}`}>
            <Typography variant="h5">{data.Title}</Typography>
          </Link>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            Released : {data.Year}
          </Typography>
          <Chip label={data.Type} />
        </CardContent>
      </Box>
    </Card>
    // </Box>
  );
}

export default Singlesearchcard;
