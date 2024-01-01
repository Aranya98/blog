import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { create, edit } from "../../Store/reducer";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./createblogs.module.css";
const Createblogs = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [state, setState] = useState({ title: "", description: "" });
  const { data } = useSelector((state) => state.blog);
  const [Edit, setEdit] = useState("");
  const [searchparams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      // Handle invalid file type here
      alert("Please select a .png or .jpeg file.");
    }
  };

  useEffect(() => {
    if (searchparams.get("edit")) {
      let data2 = data.find((item) => item.blogid == searchparams.get("edit"));
      setState({ title: data2.title, description: data2.description });
      setImagePreview(data2.Image);
      setEdit(data2);
    }
  }, []);

  const handleSubmit = () => {
    const hasEmptyValue = Object.values(state).some((value) => value === "");
    if (!hasEmptyValue && imagePreview !== null && !searchparams.get("edit")) {
      const generateRandomNumber = () => {
        const min = Math.pow(10, 9); // Minimum 10-digit number
        const max = Math.pow(10, 10) - 1; // Maximum 10-digit number
        return Math.floor(Math.random() * (max - min + 1)) + min;
      };
      let obj = {
        blogid: generateRandomNumber(),
        createdat: new Date().toISOString(),
        createdby: sessionStorage.getItem("username"),
        title: state.title,
        description: state.description,
        Image: imagePreview,
      };

      dispatch(create(obj));
      navigate("/");
    } else if (searchparams.get("edit")) {
      let obj = {
        blogid: searchparams.get("edit"),
        createdat: Edit.createdat,
        createdby: sessionStorage.getItem("username"),
        title: state.title,
        description: state.description,
        Image: imagePreview,
      };

      dispatch(edit(obj));
      navigate("/");
    } else if (hasEmptyValue) {
      alert("All fields are mandatory");
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.submain}>
        <div>
          {" "}
          <h3>Create New Blog</h3>
        </div>
        <div className={styles.subdiv}>
          <label>Title</label>
          <input
            value={state.title}
            onChange={(e) =>
              setState((val) => ({ ...val, title: e.target.value }))
            }
            className={styles.title}
          />
        </div>
        <div className={styles.subdiv}>
          <label>Description</label>
          <textarea
            value={state.description}
            onChange={(e) =>
              setState((val) => ({ ...val, description: e.target.value }))
            }
            rows={10}
            className={styles.description}
          />
        </div>
        <div className={styles.subdiv}>
          <label>Upload Image</label>
          <input
            type="file"
            onChange={handleFileChange}
            accept=".png, .jpeg, .jpg"
            className={styles.fileupload}
          />
        </div>
        <div className="d-flex mt-3 justify-content-end">
          <button onClick={() => handleSubmit()} className={styles.submitbtn}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Createblogs;
