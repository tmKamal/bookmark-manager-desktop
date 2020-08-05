import React,{useState} from "react";
import { Container, Table } from "react-bootstrap";
import ProjectItem from "./project-item";
import { AddRecord } from "./addRecord";

const App = () => {
	const [projectRecords,setProjectRecords]= useState([
		{_id:1,name:'how to custom a unix',category:'important',description:'this is a smple text for you saved web content.',url:'https://github.com/tmKamal',created:new Date().toString()},
		{_id:2,name:'how to custom a unix',category:'daily',description:'this is a smple text for you saved web content.',url:'https://github.com/tmKamal',created:new Date().toString()},
		{_id:3,name:'how to custom a unix',category:'others',description:'this is a smple text for you saved web content.',url:'https://github.com/tmKamal',created:new Date().toString()},
  ])
  
  const addItem=(item)=>{
    console.log(item);
  }
  return (
    <Container>
      <h1>Book-Marker </h1>
      <AddRecord addItem={addItem}></AddRecord>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Category</th>
            <th>Description</th>
            <th>URL</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {projectRecords.map((book)=>(
			  <ProjectItem key={book._id} record={book}></ProjectItem>
		  ))}
          
        </tbody>
      </Table>
    </Container>
  );
};

export default App;
