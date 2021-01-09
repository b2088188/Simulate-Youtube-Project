import React from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";

const Spinner = ({ classStyle, color = "#333", className }) => {
  return <CircularProgress style={{ color }} className={className} />;
};

export default styled(Spinner)`
  margin-left: 50%;
  margin-top: 5rem;
  margin-bottom: 5rem;
`;
