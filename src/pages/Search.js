import * as React from "react";
import { useEffect, useState } from "react";
import { omdb } from "../utils";
import { useSearchParams } from "react-router-dom";
import Singlesearchcard from "../components/Singlesearchcard";
import { Box, CircularProgress, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import InfiniteScroll from "react-infinite-scroller";
import { useNavigate } from "react-router-dom";
function Search() {
  const [list, setlist] = useState([]);
  const [params] = useSearchParams();
  const [getrecods, setgetrecords] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    if (params.has("q") && params.get("q") !== "") {
      setlist([]);
    }
  }, [params]);
  const loadFunc = () => {
    (async () => {
      const pageNo = Math.floor(list.length / 10) + 1;
      const response = await omdb.get(`?s=${params.get("q")}&page=${pageNo}`);
      console.log(response.data)
      if (response.data.Response === "False") {
        if (pageNo === 1) {
          navigate("/404");
        } else {
          return;
        }
      }
      setgetrecords(response.data.totalResults);

      if (response.data.Search) {
        setlist((originalList) => {
          return [...originalList, ...response.data.Search];
        });
      }
    })();
  };

  return (
    <Box p={5}>
      <Typography>{getrecods} Results Found</Typography>
      <InfiniteScroll
        pageStart={1}
        loadMore={loadFunc}
        hasMore={getrecods === 0 || list.length < getrecods}
        loader={
          <Stack alignItems={"center"} p={3}>
            <CircularProgress />
          </Stack>
        }
      >
        <Stack spacing={2} mt={3}>
          {list &&
            list.map((elem, idx) => {
              return <Singlesearchcard data={elem} key={idx} />;
            })}
        </Stack>
      </InfiniteScroll>
      {console.log(getrecods)}
   
    </Box>
  );
}

export default Search;
