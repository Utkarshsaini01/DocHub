"use client";

import React, { useState } from "react";
import Modal from "react-modal";
import {
  DocumentAddIcon,
  DocumentIcon,
  TrashIcon,
  UploadIcon,
  XIcon,
  ClipboardIcon,
} from "@heroicons/react/outline";
import { storage } from "../Config/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// Modal.setAppElement('#__next'); // Set the root element for the modal

const FileUploader = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileDelete = () => {
    setFile(null);
  };

  const handleUpload = () => {
    setModalIsOpen(true); // Open the modal

    if (file) {
      const storageRef = ref(storage, "uploads/" + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        },
        (error) => {
          setError(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUrl(downloadURL);
            setModalIsOpen(false); // Close the modal after upload
          });
        }
      );
    } else {
      setError("Please select a file to upload.");
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setFile(null);
    setUrl(null);
    setProgress(0);
  };

  const copyToClipboard = () => {
    if (url) {
      navigator.clipboard.writeText(url);
    }
  };

  return (
    <div className="border border-0 border-transparent">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Uploading Modal"
        className="fixed inset-0 backdrop-blur-sm flex items-center justify-center"
      >
        <div className="bg-slate-200 w-96 p-4 rounded-md relative">
          <XIcon
            className="h-6 w-6 absolute top-2 right-2 text-red-500 cursor-pointer"
            onClick={closeModal}
          />
          <p className="mb-4">Uploading...</p>
          <div className="w-full m-1 bg-blue-200 rounded-md overflow-hidden">
            <div
              className="bg-blue-500 h-4 rounded-md"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </Modal>
      {/* URL Modal */}
      {url && (
        <Modal
          isOpen={url !== null}
          onRequestClose={closeModal}
          contentLabel="URL Modal"
          className="fixed inset-0 backdrop-blur-sm flex items-center justify-center"
        >
          <div className="bg-slate-200 w-96 p-4 rounded-md relative">
            <XIcon
              className="h-6 w-6 absolute top-2 right-2 text-red-500 cursor-pointer"
              onClick={closeModal}
            />
            <div>
                <p>File uploaded successfully! </p>
                <div className="flex m-2 item-center">
                  <div className="bg-slate-50 w-80 overflow-x-auto p-r rounded-md whitespace-nowrap">{url}</div>
                  <ClipboardIcon
                    className="h-6 w-6 ml-2 text-blue-500 cursor-pointer"
                    onClick={copyToClipboard}
                  />
                </div>  
            </div>
          </div>
        </Modal>
      )}
      
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
            <span>{file.name.length < 20 ? file.name : file.name.slice(0, 20) + "..."}</span>
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
