import React, { useState } from 'react'
import uploadPdf from './../../services/uploadPdf.service'

export default function PdfPage() {
  const [selectedFiles, setSelectedFiles] = useState(null)


  const handleFileUpload = (event) => {
    setSelectedFiles(event);
  }

  const uploadFile = async() => {
    const data = new FormData();

    selectedFiles.forEach(file => data.append("file", file))
    try {
      await uploadPdf.sendData(data)
    } catch (error) {
      console.log(error)
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
