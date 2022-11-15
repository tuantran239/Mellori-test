import React, { Fragment } from "react";
import { Button } from "react-bootstrap";

const Results = (props) => {
  const { data: results } = props;

  const displayResults = () => {
    if (results && +results.length > 0) {
      return results.map((w) => {
        return (
          <Button disabled={true} className="mx-2 my-2" variant="secondary">
            {w}
          </Button>
        );
      });
    }
  };

  return (
    <Fragment>
      <h6>results: {results && results.length}</h6>
      {displayResults()}
    </Fragment>
  );
};

export default Results;
