import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";

export const AddRecord = ({ addItem }) => {
  const [values, setValues] = useState({
    name: "",
    category: "",
    url: "",
  });
  const { name, category, date, url } = values;
  const onChangeHandler = (inputFieldName) => (e) => {
    setValues({
      ...values,
      [inputFieldName]: e.target.value,
    });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    addItem({ name, category, url });
    console.log('thigsdrs'+addItem);
    setValues({
      name: "",
      category: "",
      url: "",
    });
  };
  return (
    <Card className="mt-3 mb-5">
      <Card.Body>
        <form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Control
              size="sm"
              type="text"
              placeholder="Name"
              value={name}
              onChange={onChangeHandler("name")}
            />
            <br />
            <Form.Control
              size="sm"
              as="select"
              onChange={onChangeHandler("category")}
            >
              <option value="important">important</option>
              <option value="daily">daily</option>
              <option value="other">other</option>
            </Form.Control>
            <br />
            <Form.Control
              size="sm"
              type="text"
              placeholder="URL"
              value={url}
              onChange={onChangeHandler("url")}
            />
            <br />
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form.Group>
        </form>
      </Card.Body>
    </Card>
  );
};
