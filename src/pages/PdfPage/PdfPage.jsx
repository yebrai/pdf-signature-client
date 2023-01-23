import React, { useState } from 'react'
import uploadPdf from './../../services/uploadPdf.service'

export default function PdfPage() {
  const [selectedFiles, setSelectedFiles] = useState(null)


  const handleFileUpload = (event) => {
    setSelectedFiles(event.target.files);
    console.log(event.target.files)
    console.log(typeof selectedFiles);
  }

  const uploadFile = async() => {
    const data = new FormData();

    for (let i = 0; i < selectedFiles.length; i++) {
      data.append("file", selectedFiles[i])
    }

    try {
        await uploadPdf.sendData(data);
    } catch (error) {
        console.log(error);
    }
}
  return (
    <>
    <div>PdfPage</div>
    <div>
    <input type="file" onChange={handleFileUpload} multiple/>
    <button onClick={uploadFile}>Upload</button>
    </div>
    </>

  )
}
