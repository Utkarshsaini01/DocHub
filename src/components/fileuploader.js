"use client";

import React, { useState } from "react";
import {
  DocumentAddIcon,
  DocumentIcon,
  TrashIcon,
  UploadIcon,
} from "@heroicons/react/outline";
import {storage} from '../Config/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';


const FileUploader = () => {
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);


    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleFileDelete = () => {
        setFile(null);
    };

    const handleUpload = () => {
        if (file) {
          const storageRef = ref(storage, 'uploads/' + file.name);
          const uploadTask = uploadBytesResumable(storageRef, file);
      
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setProgress(progress);
            },
            (error) => {
              setError(error.message);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setUrl(downloadURL);
              });
            }
          );
        } else {
          setError('Please select a file to upload.');
        }
      };
      
      

  return (
    <div className="border border-0 border-transparent">
      {!file ? (
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
            <span>{file.name}</span>
          </div>
          <div className="box-content bg-red-200 text-center p-2 rounded mt-2 relative flex items-center justify-center">
            <button
              onClick={handleFileDelete}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            ></button>
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
            ></button>
            <UploadIcon className="h-5 w-5 text-green-500 mx-1" />
            <span>Upload file</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
