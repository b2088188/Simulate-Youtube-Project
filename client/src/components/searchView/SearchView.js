import * as R from "ramda";
import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import { List } from "../../design/components";
import { setFlex } from "../../design/utils";
import { useSearchState } from "../../stores/search/searchStateContext";
import { useSearchActions } from "../../stores/search/searchActionContext";
import SearchItem from "./SearchItem";
import Pagination from "./Pagination";
import Spinner from "../../utils/spinner/Spinner";
import axios from "axios";

const SearchView = ({ className }) => {
  const { videos, statusVideos } = useSearchState();
  const { fetchVideos } = useSearchActions();
  const [page, setPage] = useState(1);
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const q = searchParams.get("q");
  useEffect(() => {
    fetchVideos(axios.get(`/api/v1/videos?q=${q}`));
  }, [q]);

  function calcPage(list, page, resPerPage = 5) {
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;
    return list.slice(start, end);
  }

  function renderList(list) {
    return list?.map(function generateItem(result) {
      return <SearchItem key={result._id} result={result} />;
    });
  }
  const renderSearchList = R.pipe(calcPage, renderList);

  if (statusVideos === "idle" || statusVideos === "pending") return <Spinner />;
  if (statusVideos === "resolved")
    return (
      <div className={className}>
        <nav className="navigation">
          <List>{renderSearchList(videos, page)}</List>
        </nav>
        {videos.length > 1 ? (
          <Pagination
            pages={Math.ceil(videos.length / 5)}
            page={page}
            changePage={setPage}
          />
        ) : null}
      </div>
    );
};

export default styled(SearchView)`
  ${setFlex({ x: "center", wrap: "wrap" })}
  padding: 5rem 0rem;

  .navigation {
    flex: 0 0 60%;

    @media only screen and (max-width: 56.25em) {
      flex: 0 0 90%;
    }
  }
`;
