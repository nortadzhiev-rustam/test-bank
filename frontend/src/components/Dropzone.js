import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Wallpaper } from "@mui/icons-material";
const baseStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  transition: "border .3s ease-in-out",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

function DropzoneComponent({ open, setImage, image }) {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      setImage(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    [setImage]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png",
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  const thumbs = files.map((file) => (
    <div key={file.name}>
      <img style={{ width: 200 }} src={file.preview} alt={file.name} />
    </div>
  ));

  // clean up
  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  useEffect(() => {
    if (!open) {
      setFiles([]);
    }
  }, [open]);

  return (
    <section>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <div
          style={{
            cursor: "pointer",
            diplay: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Drag and drop your images here or click here.
        </div>
      </div>
      <aside
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {thumbs}
      </aside>
    </section>
  );
}

export default DropzoneComponent;
