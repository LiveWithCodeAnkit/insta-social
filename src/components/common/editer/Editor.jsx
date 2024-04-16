import { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import "./editer.css";

const Loading = () => <div>Loading...</div>;

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <Loading />,
});

const QuillMinimal = ({ value, onChange, label }) => {
  const [isLoading, setIsLoading] = useState(true);

  const modules = {
    toolbar: [["bold"], [{ list: "bullet" }]],
  };

  const formats = ["bold", "list", "bullet"];

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <>
      <ReactQuill
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        onLoad={handleLoad}
      />
    </>
  );
};

export default QuillMinimal;
