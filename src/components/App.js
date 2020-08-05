import React,{useState} from "react";
import { Container, Table } from "react-bootstrap";
import ProjectItem from "./project-item";

const App = () => {
	const [projectRecords,setProjectRecords]= useState([
		{id:1,name:'how to custom a unix',description:'this is a smple text for you saved web content.',url:'https://github.com/tmKamal',created:new Date().toString()},
		{id:1,name:'how to custom a unix',description:'this is a smple text for you saved web content.',url:'https://github.com/tmKamal',created:new Date().toString()},
		{id:1,name:'how to custom a unix',description:'this is a smple text for you saved web content.',url:'https://github.com/tmKamal',created:new Date().toString()},
	])
  return (
    <Container>
      <h1>Book-Marker </h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>URL</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {projectRecords.map((book)=>(
			  <ProjectItem id={book.id}></ProjectItem>
		  ))}
          
        </tbody>
      </Table>
    </Container>
  );
};

export default App;
