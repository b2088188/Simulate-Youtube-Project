import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Form, Icon, Button } from "../../design/components";
import SearchIcon from "@material-ui/icons/Search";
const SearchForm = ({ className }) => {
  const { register, errors, handleSubmit, reset } = useForm();
  const history = useHistory();

  function onSubmit({ term }) {
    history.push(`/results/?q=${term}`);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className={className}>
      <Form.Group horizontal>
        <Form.Input
          modifiers="round"
          type="text"
          name="term"
          placeholder="Search videos ..."
          ref={register({
            required: "Search Term can't not be empty.",
          })}
        />
        <Button modifiers="transparent">
          <Icon as={SearchIcon} modifiers={["small"]} />
        </Button>
      </Form.Group>
    </Form>
  );
};

export default styled(SearchForm)`
  @media only screen and (max-width: 37.5em) {
    order: 1;
    flex: 0 0 100%;
    background-color: var(--color-grey-light-2);
  }
`;
