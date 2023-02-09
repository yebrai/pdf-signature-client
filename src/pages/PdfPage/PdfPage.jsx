import axios from "axios";
import React, { useEffect, useState } from "react";
import uploadPdf from "./../../services/uploadPdf.service";
import Loading from "../../components/Loading/Loading";

export default function PdfPage() {
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [pdfs, setPdfs] = useState([]);
  const [isFileReceived, setIsFileReceived] = useState(false);
  const [receptionMessage, setReceptionMessage] = useState("");
  const [isFetching, setIsFetching] = useState(true);
  const [isUploadButtonDisabled, setIsUploadButtonDisabled] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const handleFileUpload = (event) => {
    event.target.files.length !== 0 && setIsUploadButtonDisabled(false);
    setSelectedFiles(event.target.files);
  };

  const getData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5005/api/upload/files"
      );
      setPdfs(response.data);
      setIsFetching(false);
    } catch (error) {
      setReceptionMessage(error);
      setIsFetching(false);
    }
  };

  const uploadFile = async () => {
    setIsFetching(true);
    const data = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      data.append("file", selectedFiles[i]);
    }
    try {
      const response = await uploadPdf.sendData(data);
      setIsFileReceived(true);
      setReceptionMessage(response.data.message);
      response.data.success && (await getData());
    } catch (error) {
      setIsFileReceived(true);
      setReceptionMessage(error.response.data.message);
      setIsFetching(false);
    }
  };
  return (
    <>
      {isFetching ? (
        <Loading />
      ) : (
        <>
          <div>PdfPage</div>
          <div>
            <input
              id="input-file"
              type="file"
              onChange={handleFileUpload}
              multiple
            />
            {isFileReceived && <p>{receptionMessage}</p>}
            <button
              id="upload-button"
              onClick={uploadFile}
              disabled={isUploadButtonDisabled}
            >
              Upload
            </button>
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
      )}
    </>
  );
}
