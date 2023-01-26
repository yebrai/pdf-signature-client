import axios from 'axios';
import React, { useEffect, useState } from 'react'
import uploadPdf from './../../services/uploadPdf.service'

export default function PdfPage() {
  const [selectedFiles, setSelectedFiles] = useState(null)
  const [pdfs, setPdfs] = useState([]);
  const [loader, setLoader] = useState(false)

  const handleFileUpload = (event) => {
    setSelectedFiles(event.target.files);
  }

  const getData = async() => {
    try {
      const response = await axios.get('http://localhost:5005/api/upload/files')
      
      console.log(pdfs)
      setPdfs(response.data)

    } catch (error) {
      console.log(error)
    } 
  }

  const uploadFile = async() => {
    const data = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      data.append("file", selectedFiles[i])
    }

    try {
        const response = await uploadPdf.sendData(data);
        // setPdfs(response.data)
        // console.log(response.data)
        
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
    <div>

      <button onClick={getData}>Descarga</button>
      {pdfs && pdfs.map((file, index)=> {
        return (
          <div>
          <br />
          <a key={index} href={`http://localhost:5005/api/upload/download/${file.fileName}`} download={`${file.fileName}.pdf`}>{file.fileName}</a>
          </div>)
      })}

    </div>
    <div>
</div>
    </div>
    </>

  )
}
