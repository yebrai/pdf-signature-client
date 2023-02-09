import axios from "axios";
import React, { useEffect, useState } from "react";
import uploadPdf from "./../../services/uploadPdf.service";

export default function PdfPage() {
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [pdfs, setPdfs] = useState([]);
  const [isFileReceived, setIsFileReceived] = useState(false);
  const [receptionMessage, setReceptionMessage] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const handleFileUpload = (event) => {
    setSelectedFiles(event.target.files);
  };

  const getData = async () => {
    console.log("getdataaa");
    try {
      const response = await axios.get(
        "http://localhost:5005/api/upload/files"
      );
      setPdfs(response.data);
      console.log("getdata ", pdfs);
    } catch (error) {
      console.log("getdata error", error);
      setReceptionMessage(error)
    }
  };

  const uploadFile = async () => {
    const data = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      data.append("file", selectedFiles[i]);
    }
    try {
      const receptionMessage = await uploadPdf.sendData(data);
      setIsFileReceived(receptionMessage.data.success);
      setReceptionMessage(receptionMessage.data.message);
      receptionMessage.data.success && (await getData());
    } catch (error) {
      setReceptionMessage(error.message);
    }
  };
  return (
    <>
      <div>PdfPage</div>
      <div>
        <input type="file" onChange={handleFileUpload} multiple />
        {isFileReceived && <p>{receptionMessage}</p>}
        <button onClick={uploadFile}>Upload</button>
        <div>
          {/* <button onClick={getData}>Descarga</button> */}
          {pdfs.length === 0 ? (
            <p>Aún no se ha enviado ningún archivo</p>
          ) : (
            pdfs.map((file, index) => {
              return (
                <div>
                  <br />
                  <a
                    key={index}
                    href={`http://localhost:5005/api/upload/download/${file.fileName}`}
                    download={`${file.fileName}.pdf`}
                  >
                    {file.fileName}
                  </a>
                </div>
              );
            })
          )}
        </div>
        <div></div>
      </div>
    </>
  );
}
