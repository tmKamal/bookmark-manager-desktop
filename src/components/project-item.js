import React from "react";
import { Badge, Button } from "react-bootstrap";
import Moment from 'react-moment';

const ProjectItem = ({
  record: { _id, name, category, description, url, created },
}) => {
  const setVarient = () => {
    if (category === "important") {
      return "danger";
    } else if (category === "daily") {
      return "success";
    }
  };
  return (
    <tr className="h-100">
      <td>{_id}</td>
      <td className="align-middle">{name}</td>
      <td className="align-middle">
        <Badge className="d-flex justify-content-center" variant={setVarient()}>
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </Badge>
      </td>
      {/* to capital the first letter of category name. */}
      <td className="align-middle">{description}</td>
      <td className="align-middle">{url}</td>
      <td className="align-middle">
        <Moment format="MMMM Do YYYY">{created}</Moment>
      </td>
      <td className="align-middle text-center">
        <Button className="" variant="danger" size="sm">
          X
        </Button>
      </td>
    </tr>
  );
};

export default ProjectItem;
