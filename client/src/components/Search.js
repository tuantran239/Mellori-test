import React, { Fragment, useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useAxios } from "react-hooks-axios";
import Results from "./Results";

const Search = (props) => {
  const { option } = props;

  const [word, setWord] = useState("");
  const [data, setData] = useState([]);

  const { axiosCallback } = useAxios();
  const [search, { loading }] = axiosCallback();

  useEffect(() => {
    setWord("");
    setData([]);
  }, [option]);

  const onSearchHandler = (e) => {
    if (word.trim().length === 0) {
      alert("word not empty");
      return;
    }

    search({
      url: `/${option}`,
      method: "post",
      body: { word: word.trim() },
      onCompleted(data) {
        setData(data.data);
      },
      onError(error) {
        console.log(error);
      },
    });
  };

  return (
    <Fragment>
      <InputGroup className="my-3">
        <Form.Control
          placeholder="Search word"
          onChange={(e) => setWord(e.target.value)}
          disabled={loading}
          value={word}
        />
        <Button disabled={loading} variant="primary" onClick={onSearchHandler}>
          Search
        </Button>
      </InputGroup>
      <Results data={data} />
    </Fragment>
  );
};

export default Search;
