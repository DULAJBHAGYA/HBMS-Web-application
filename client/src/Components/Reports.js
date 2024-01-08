import React, { useState, useEffect, useRef } from 'react';
import '../Styles/Reports.css';
import Upload from '../Images/upload.jpg';
import NavBar from './NavBar';
import axios from 'axios';

const Reports = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const [name, setName] = useState("");

  const getItems = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8000/qpi/v1/items");
      setItems(res.data.items);
      setLoading(false);
      console.log(res.data.items);
    } catch (error) {
      console.log(error);
    }
  };

  const addItem = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("file", fileInputRef.current.files[0]);
      const res = await axios.post(
        "http://localhost:8000/api/v1/items",
        formData
      );
      console.log(res);
      // Clear the input fields
      setName("");
      fileInputRef.current.value = null;
    } catch (error) {
      console.log(error);
    }
  };
  

  const removeFile = () => {
    fileInputRef.current.value = ""; // Clear the file input value
  };

  const downloadFile = async (id) =>{
    try{
      const res = await axios.get(
        `http://localhost:8000/api/v1/items/download/${id}`,
        {responseType:'blob'},
      );
      const blob = new Blob([res.data], {type:res.data.type});
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download= "file.pdf";
      link.download=res.headers['content-disposition'].split('filename=')[1];
    }
    catch(error){
      console.log(error);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  
  return (
    <div className='container'>
      <NavBar />
      <h4 style={{ fontWeight: '600' }}>Upload reports and analysis</h4>
      <div className='report-container  rounded' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', backgroundColor: '#C4D1F7' }}>
        <div className='card' style={{ height:'75vh', width: '28rem' }}>
          <img className='card-img-top' src={Upload} alt='Card image cap' />
          <div className='card-body'>
            <p className='card-title'>Upload file here</p>
            <div>
              <input style={{marginBottom:'5px'}} type="text" className="form-control" id="usr" placeholder='Report name' 
              onChange={(e)=>setName(e.target.value)}/>
            </div>
            <div>
              <input type="file" className="form-control" id="customFile" ref={fileInputRef} />
            </div>
            <a href='#' className='btn btn-danger' style={{ marginTop: '10px', marginLeft: '35px' }} onClick={removeFile}>
              Remove
            </a>
            <a href='#' className='btn btn-primary' style={{ marginTop: '10px', marginLeft: '35px' }} onClick={addItem}>
              Submit
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;