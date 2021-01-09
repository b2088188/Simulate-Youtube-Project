import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import { Container, Row } from "../../design/components";
import { setFlex } from "../../design/utils";
import HomeContext from "../../stores/home/homeContext";
import HomeItem from "./HomeItem";
import Spinner from "../../utils/spinner/Spinner";

const Home = ({ className }) => {
  const { results, loadHomeVideos, loading } = useContext(HomeContext);
  useEffect(() => {
    loadHomeVideos();
  }, []);

  function renderResults(list) {
    return list.map(function generateItem(video) {
      return <HomeItem key={video._id} video={video} />;
    });
  }

  if (loading) return <Spinner classStyle="center" />;

  return <Row className={className}>{renderResults(results)}</Row>;
};

export default styled(Home)`
  padding: 2rem;
`;
