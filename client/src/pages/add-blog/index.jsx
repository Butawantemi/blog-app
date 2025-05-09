import { useContext, useEffect } from "react";
import classes from "./styles.module.css";
import { GlobalContext } from "../../context";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const AddBlog = () => {
  const { formData, setFormData, isEdit, setIsEdit } =
    useContext(GlobalContext);
  const navigate = useNavigate();
  const location = useLocation();

  console.log(formData);

  const handleSaveBlogToDatabase = async () => {
    const response = isEdit
      ? await axios.put(
          `http://localhost:3000/api/blogs/update/${location.state.getCurrentBlogItem._id}`,
          {
            title: formData.title,
            description: formData.description,
          }
        )
      : await axios.post("http://localhost:3000/api/blogs/add", {
          title: formData.title,
          description: formData.description,
        });

    const result = response.data;
    console.log(result);

    if (result) {
      setIsEdit(false)
      setFormData({
        title: "",
        description: "",
      });
      navigate("/");
    }
  };

  useEffect(() => {
    console.log(location);
    if (location.state) {
      const { getCurrentBlogItem } = location.state;
      setIsEdit(true);
      setFormData({
        title: getCurrentBlogItem.title,
        description: getCurrentBlogItem.description,
      });
    }
  }, [location]);

  return (
    <div className={classes.wrapper}>
      <h1>{isEdit ? "Edit a Blog" : "Add a Blog"}</h1>
      <div className={classes.formWrapper}>
        <input
          type="text"
          name="title"
          placeholder="Enter Blog Title"
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <textarea
          name="description"
          id="description"
          placeholder="Enter Blog Description"
          value={formData.description}
          onChange={(event) =>
            setFormData({
              ...formData,
              description: event.target.value,
            })
          }
        ></textarea>
        <button onClick={handleSaveBlogToDatabase}>
          {isEdit ? "Edit Blog" : "Add Blog"}
        </button>
      </div>
    </div>
  );
};

export default AddBlog;
