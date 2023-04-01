import React from "react";
import { omdb } from "../utils";
import { useEffect } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function FavouriteMovie({ id }) {
  const navigate = useNavigate();
  const navi = () => {
    navigate(`/detail/${id}`);
  };
  const [movie, setmovie] = useState({});
  useEffect(() => {
    (async () => {
      const response = await omdb.get(`?i=${id}`);
      setmovie(response.data);
    })();
  }, [id]);
  return (
    <div>
      <Grid item xs={3} spacing={4} padding={3} sx={{}}>
        <Card style={{ height: "300px", width: "300px" }} sx={{}}>
          <CardActionArea onClick={navi}>
            <CardMedia
              sx={{ height: 140 }}
              image={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://www.ncenet.com/wp-content/uploads/2020/04/No-image-found.jpg"
              }
              title="green iguana"
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                color={"white"}
              >
                {movie.Title}
              </Typography>
              <Typography>{movie.Type}</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </div>
  );
}

export default FavouriteMovie;
