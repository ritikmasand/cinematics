import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { omdb } from "../utils";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import {  Chip, IconButton, Typography } from "@mui/material";
import axios from "axios";
import FavoriteIcon from "@mui/icons-material/Favorite";
import useLocalStorage from "use-local-storage";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
function Detail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setdata] = useState({});
  const [flag, setflag] = useState([]);
  const [favourites, setfavourites] = useLocalStorage("favourite", "[]");
  const [isfavourite, setfavourite] = useState(false);

  useEffect(() => {
    const favs = JSON.parse(favourites);
    if (favs.includes(id)) {
      setfavourite(true);
    } else {
      setfavourite(false);
    }
  }, [favourites, id]);
  const togglefunction = () => {
    const favs = JSON.parse(favourites);

    if (isfavourite) {
      const idx = favs.indexOf(id);
      favs.splice(idx, 1);

      setfavourite(false);
    } else {
      favs.push(id);
      setfavourite(true);

    }
    setfavourites(JSON.stringify(favs));
  };
  useEffect(() => {
    (async () => {
      const response = await omdb.get(`?i=${id}&plot=full`);
      if (response.data.Response === "False") {
        navigate("/404");
      } else {
        setdata(response.data);
        console.log(response.data);
      }
    })();
  }, [id, navigate]);
  useEffect(() => {
    if (data.Country?.length > 0) {
      (async () => {
        const response = await axios.get(
          `https://restcountries.com/v3.1/name/${data.Country.split(",")[0]}?fullText=true`
        );
        console.log(response.data);
        setflag(response.data[0]?.flags?.svg);
      })();
    }
  }, [data ]);
  return (
    <Box p={3.5}>
      <Stack spacing={3}>
        <Stack direction="row" spacing={3}>
          <img
            src={
              data.Poster !== "N/A"
                ? data.Poster
                : "https://www.ncenet.com/wp-content/uploads/2020/04/No-image-found.jpg"
            }
            alt="Poster"
          ></img>
          <Box spacing={3}>
            <Typography variant="h3">
              {" "}
              {data.Title}
              &nbsp;
              <IconButton
                fontSize="small"
                color="error"
                onClick={togglefunction}
              >
                {isfavourite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
            </Typography>
            {data.Released !== "N/A" ? (
              <Typography variant="h5">{data.Released}</Typography>
            ) : (
              false
            )}

            <Stack direction="row" spacing={2} mt={1}>
              {data.Actors &&
                data.Actors.split(", ").map((e, i) => {
                  return <Chip label={e} />;
                })}
              {data.Writer &&
                data.Writer.split(", ").map((e, i) => {
                  return <Chip label={e} />;
                })}
            </Stack>
            <Stack direction="row" alignItems={"center"} gap="2rem">
              {console.log(data.Country)}
              {data.Country !== "N/A" ? (
                <>
                  <img
                    src={flag}
                    alt="country"
                    style={{
                      outline: "2px solid blue",
                      width: "7rem",
                      marginTop: "1rem",
                    }}
                  />
                  <Typography>{data.Country}</Typography>
                </>
              ) : (
                false
              )}
            </Stack>
            {/* <Avatar alt="country flag" src={flag} /> */}
          </Box>
        </Stack>
        {data.Plot !== "N/A" ? (
          <>
            <Typography variant="h4">Plot : </Typography>
            <Typography align="justify">{data.Plot}</Typography>
          </>
        ) : (
          false
        )}
      </Stack>
    </Box>
  );
}

export default Detail;
