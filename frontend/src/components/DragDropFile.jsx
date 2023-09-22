import React from "react";
import "../static/dragDrop.css";
import userService from '../services/userService'
import {useNavigate} from "react-router-dom"
import { useContext } from "react";
import { appContext, } from "../App";

const DragDropFile = () => {
    // drag state
    const [dragActive, setDragActive] = React.useState(false);
    const [selectedFile, setSelectedFile] = React.useState(null);
    const [selectedOption, setSelectedOption] = React.useState('telugu');
    const {setData,setIsLoading} = useContext(appContext)
    const navigate= useNavigate()
    const handleFile = (files) => {
        // Assuming you want to store only the first selected file.
        const file=files[0];
        setSelectedFile(file);
        if (file) {
          const fileName = file.name;
          inputRef.current.value = fileName;
        }
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Here, you can do something with the selectedFile and selectedOption.
    // For example, you can upload the file to a server and save the selected option.

    if (selectedFile) {
      // console.log('Selected File:', selectedFile);
      navigate('/extractedText');
      const response= await userService.upload_data(selectedFile,selectedOption);
      setData(response);
      setIsLoading(false);
      
    }
    // console.log('Selected Option:', selectedOption);
  };
  // ref
  const inputRef = React.useRef(null);

  // handle drag events
  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files);
    }
  };

  // triggers when file is selected with click
  const handleChange = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files);
    }
  };

  // triggers the input when the button is clicked
  const onButtonClick = () => {
    inputRef.current.click();
  };

  return (
    <div className="container">
    <form
      id="form-file-upload"
      onDragEnter={handleDrag}
    //   onSubmit={(e) => e.preventDefault()}
      onSubmit={handleSubmit}
      
    >
      <input
        ref={inputRef}
        type="file"
        id="input-file-upload"
        multiple={true}
        onChange={handleChange}
      />
      <label
        id="label-file-upload"
        htmlFor="input-file-upload"
        className={dragActive ? "drag-active" : ""}
      >
        <div>
          <img src="../../public/upload.png" height={"20%"} width={"20%"}></img>
          <p>{selectedFile?selectedFile.name:"Drag and drop your file here or"}</p>
          <button className="upload-button" onClick={onButtonClick} >
            Upload a file
          </button>
        </div>
      </label>
      {dragActive && (
        <div
          id="drag-file-element"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        ></div>
      )}

      <div className="select-wrapper">
        <select 
            className="select"
            value={selectedOption}
            onChange={handleOptionChange}
        >
          <option value="telugu">Telugu</option>
          <option value="tamil">Tamil</option>
          <option value="kannada">Kannada</option>
          <option value="malayalam">Malayalam</option>
        </select>
      </div>

      <button className="submit-button">Submit</button>
    </form>
    </div>
  );
};

export default DragDropFile;
