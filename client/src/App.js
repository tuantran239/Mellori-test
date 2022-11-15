import React, { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import Search from "./components/Search";

function App() {
  const [option, setOption] = useState(null);
  return (
    <Container>
      <Row>
        <Col xl={8} className="mx-auto">
          <h1>SEARCH ENGINE</h1>
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => setOption(e.target.value)}
          >
            <option disabled={true} selected={true}>
              Select Options
            </option>
            <option value="w">Find 3 most similar words</option>
            <option value="x">Update and query word</option>
            <option value="y">Find except word</option>
          </Form.Select>
          {option && <Search option={option} />}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
