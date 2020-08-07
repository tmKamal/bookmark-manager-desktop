import React,{useState,useEffect} from "react";
import { Container, Table, Alert } from "react-bootstrap";
import ProjectItem from "./project-item";
import { AddRecord } from "./addRecord";
import { ipcRenderer } from "electron";





const App = () => {
	const [records,setRecords]= useState([]);

  const [alert,setAlert]=useState({msg:'',varient:'',show:false});

  useEffect(() => {
    ipcRenderer.send('records:load');
    ipcRenderer.on('records:get',(e,recs)=>{
      setRecords(JSON.parse(recs));
    })//catch asynchronous msg which send from the main
  }, [])

  const addItem=(item)=>{
    if(item.name==='' || item.category==='' || item.url===''){
      showAlert('Please fill out the all required feilds.',4000,'danger');
     return false;
    }

    console.log('im still i n')
    /* item._id= Math.floor(Math.random( )*100);
    item.created=new Date().toString();
    setRecords([...records,item]);  */ //
    ipcRenderer.send('records:add',item);
    showAlert('Bookmark has been saved');
  }
  const showAlert=(msg,time=4000,varient='success')=>{
    console.log('somebdoy called me')
    setAlert({
      msg,
      varient,
      show:true

    });
    setTimeout(() => {
      setAlert({
        msg:'',
        varient:'',
        show:false
      })
    }, time);
    
  }
  const deleteItemHandler=(_id)=>{
    console.log('ima deleter');
    ipcRenderer.send('records:delete',_id);

    /* setRecords(records.filter((book)=>
      book._id !==_id
    )); */
  }
  
  return (
    <Container>
      <h1>Book-Marker </h1>
      <AddRecord addItem={addItem} ></AddRecord>
      {alert.show && <Alert variant={alert.varient}>{alert.msg}</Alert>}
     
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Category</th>
            <th>URL</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {records.map((book)=>(
			  <ProjectItem key={book._id} record={book} deleteItem={deleteItemHandler}></ProjectItem>
		  ))}
          
        </tbody>
      </Table>
    </Container>
  );
};

export default App;
