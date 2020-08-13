import React from "react";
import { Badge, Button } from "react-bootstrap";
import Moment from 'react-moment';
const { shell } = require('electron')




const ProjectItem = ({
  record: { _id, name, category, description, url, created },deleteItem
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
      
      <td className="align-middle">{name}</td>
      <td className="align-middle">
        <Badge className="d-flex justify-content-center" variant={setVarient()}>
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </Badge>
      </td>
      {/* to capital the first letter of category name. */}
   
      <td className="align-middle">
        <Moment format="MMMM Do YYYY">{created}</Moment>
      </td>
      <td className="align-middle ">
        <a className="btn btn-info ml-5 mr-5" href={url}>Open here</a>
        <Button onClick={()=>shell.openExternal(url)} variant="success">Open from browser</Button>
      </td>
      <td className="align-middle text-center">
        <Button className="" variant="danger" size="sm" onClick={()=>deleteItem(_id)}>
          X
        </Button>
      </td>
    </tr>
  );
};

export default ProjectItem;
