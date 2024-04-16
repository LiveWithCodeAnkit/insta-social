"use client";
import { Fragment, useEffect, useState } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { MdOutlineModeEdit } from "react-icons/md";
import Image from "next/image";
// ** Icon Imports
// import Icon from "src/@core/components/icon";
import { FaUpload } from "react-icons/fa";
// ** Third Party Imports
import { useDropzone } from "react-dropzone";
import { MdAddAPhoto } from "react-icons/md";

const MAX_FILE_SIZE = 6 * 1024 * 1024;

const buttonStyle = {
  background: "none",
  border: "none",
  color: "#FFCC33",
  textDecoration: "none",
  cursor: "pointer",
  padding: 0,
  fontSize: "16px",
  fontWeight: "bold",
  height: "20px",
};

const FileUploaderMultiple = ({
  value,
  onChange,
  imgWidth = 200,
  imgHeight = 200,
  errors,
}) => {
  // ** State
  const [files, setFiles] = useState(value || []);
  const [errorsMes, setErrorsMes] = useState("");
  const [rejectedFiles, setRejectedFiles] = useState([]);
  useEffect(() => {
    if (value && value !== files) {
      setFiles(value);
    }
  }, [value]);
  // ** Hooks
  // const { getRootProps, getInputProps } = useDropzone({
  //   onDrop: (acceptedFiles) => {
  //     setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  //   },
  // });

  const renderFilePreview = (file) => {
    if (file.type.startsWith("image")) {
      return (
        <Image
          src={URL.createObjectURL(file)}
          width={imgWidth}
          height={imgHeight}
          alt={file.name}
        />
      );
    } else if (file.type.startsWith("video")) {
      return (
        <video
          style={{
            width: "200px",
            aspectRatio: "auto 200 / 200",
            height: "200px",
          }}
          controls
        >
          <source src={URL.createObjectURL(file)} type={file.type} />
          Your browser does not support the video tag.
        </video>
      );
    } else {
      return <span>Not support</span>;
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles, fileRejections) => {
      const filteredFiles = acceptedFiles.filter((file) => {
        const fileType = file.type.split("/")[0];
        return fileType === "image" || fileType === "video";
      });

      if (files.length + filteredFiles.length > 5) {
        const remainingSpace = 5 - files.length;
        filteredFiles.splice(remainingSpace);
      }
      setRejectedFiles(fileRejections);

      const errorMsgs = fileRejections.map((fileRejection) => {
        return fileRejection.errors.map((err) => err.message).join(", ");
      });

      setErrorsMes(errorMsgs.join(", "));

      setFiles((prevFiles) => [...prevFiles, ...filteredFiles]);
      onChange([...files, ...filteredFiles]);
    },

    maxSize: MAX_FILE_SIZE,
    accept: {
      "image/*": [],
      "video/*": [],
    },
  });

  const handleRemoveFile = (file) => {
    setFiles((prevFiles) => prevFiles.filter((f) => f.name !== file.name));
    onChange(files.filter((f) => f.name !== file.name));
  };

  //   const handleRemoveFile = (file) => {
  //     const uploadedFiles = files;
  //     const filtered = uploadedFiles.filter((i) => i.name !== file.name);
  //     setFiles([...filtered]);
  //   };
  //   const handleRemoveFile = (file) => {
  //     setFiles((prevFiles) => prevFiles.filter((f) => f.name !== file.name));
  //   };

  const fileList = files.map((file, index) => (
    <div
      key={index}
      style={{
        display: "flex",
        gap: "2rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="file-preview">{renderFilePreview(file)}</div>

        <Button
          variant="outlined"
          color="error"
          onClick={() => handleRemoveFile(file)}
          sx={{
            width: "100%",
          }}
        >
          Remove file
        </Button>
      </div>
    </div>
  ));

  const handleRemoveAllFiles = () => {
    setFiles([]);
  };

  return (
    <Fragment>
      <Box
        sx={{
          border: "2px dashed #FFCC33",
          borderRadius: "15px",
          width: "100%",
          minHeight: "12.5rem",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FEFAED",
          position: "relative",
          padding: "1rem",
        }}
      >
        {files.length ? (
          <Fragment>
            <Box
              as="div"
              sx={{
                display: "flex",
                gap: "1rem",
              }}
            >
              {fileList}
            </Box>
          </Fragment>
        ) : null}
        {files.length === 5 ? (
          <></>
        ) : (
          <>
            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
              {!files.length && (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      textAlign: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <FaUpload
                      style={{
                        color: "#FFCC33",
                        width: "30px",
                        height: "28px",
                      }}
                    />
                    <div>
                      <span className="dz-message-text">
                        Drag & drop images and videos
                      </span>
                      <div
                        className="dz-message-btn"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                      >
                        <span>or</span>
                        <button
                          style={buttonStyle}
                          size="sm"
                          variant="primary"
                          type="button"
                        >
                          Browse Files
                        </button>
                      </div>
                    </div>
                  </Box>
                </>
              )}

              <MdAddAPhoto
                style={{
                  fontSize: "30px",
                  color: "#FFCC33",
                  cursor: "pointer",
                  visibility: files.length !== 5 ? "visible" : "hidden",
                }}
              />
            </div>
          </>
        )}
      </Box>

      {(rejectedFiles.length > 0 || errorsMes) && (
        <Typography variant="caption" color="error">
          {/* {errorsMes} */}
          File is larger than 6MB
        </Typography>
      )}

      {errors && errors.images && (
        <Typography variant="caption" color="error">
          {errors.images.message}
        </Typography>
      )}
    </Fragment>
  );
};

export default FileUploaderMultiple;
