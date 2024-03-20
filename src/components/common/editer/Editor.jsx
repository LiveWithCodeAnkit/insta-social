import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Import Quill CSS
import "./editer.css"; // Import custom CSS

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

const QuillMinimal = ({ value, onChange, label }) => {
  const modules = {
    toolbar: [["bold"], [{ list: "bullet" }]],
  };

  const formats = ["bold", "list", "bullet"];

  return (
    <>
      <ReactQuill
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
      />
    </>
  );
};

export default QuillMinimal;
