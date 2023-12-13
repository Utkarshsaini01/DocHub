"use client";

import React, { useState } from "react";
import {DocumentAddIcon, DocumentIcon, TrashIcon, UploadIcon} from '@heroicons/react/outline';





const FileUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);


  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileDelete = () => {
    setSelectedFile(null);
  };

  const handleUpload = () => {
    
  }

  return (
    
    <div className="border border-0 border-transparent">
        
      {!selectedFile ? (
        // No file selected
        <div className="flex flex-col item-center justify-center p-4">
          <div className="box-content bg-slate-300 text-center p-2 rounded flex items-center justify-center">
          <DocumentIcon className="h-5 w-5 text-blue-500 mx-1" /> 
          <span>No file selected</span>
          </div>
          <div className="box-content bg-sky-300 text-center p-2 rounded mt-2 relative flex items-center justify-center">
            <input
              type="file"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <DocumentAddIcon className="h-5 w-5 text-blue-500 mx-1" /> 
            <span>Select File</span>
          </div>
        </div>
      ) : (
        // File selected
        <div className="flex flex-col item-center justify-center p-4">
          <div className="box-content bg-slate-300 text-center p-2 rounded flex items-center justify-center">
            <DocumentIcon className="h-5 w-5 text-blue-500 mx-1" /> 
            <span>{selectedFile.name}</span>
          </div>
          <div className="box-content bg-red-200 text-center p-2 rounded mt-2 relative flex items-center justify-center">
            <button
              onClick={handleFileDelete}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            >
            </button>
            <TrashIcon className="h-5 w-5 text-red-500 mx-1" />
            <span>Delete file</span>
          </div>
          <div className="box-content bg-sky-300 text-center p-2 rounded mt-2 relative flex items-center justify-center">
            <input
              type="file"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <DocumentAddIcon className="h-5 w-5 text-blue-500 mx-1" /> 
            <span>Change File</span>
          </div>
          <div className="box-content bg-green-200 text-center p-2 rounded mt-2 relative flex items-center justify-center">
            <button
              onClick={handleUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            >
            </button>
            <UploadIcon className="h-5 w-5 text-green-500 mx-1" /> 
            <span>Upload file</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
