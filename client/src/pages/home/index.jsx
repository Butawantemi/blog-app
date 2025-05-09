import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import classes from "./styles.module.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { blogList, setBlogList, pending, setPending } =
    useContext(GlobalContext);
  const navigate = useNavigate();

  const fetchListOfBlogs = async () => {
    setPending(true);
    const response = await axios.get("http://localhost:3000/api/blogs");
    const result = response.data;
    console.log(result);

    if (result && result.blogList && result.blogList.length) {
      setPending(false);
      setBlogList(result.blogList);
    } else {
      setPending(false);
      setBlogList([]);
    }
  };

  const handleDeleteBlog = async (getCurrentId) => {
    const response = await axios.delete(
      `http://localhost:3000/api/blogs/delete/${getCurrentId}`
    );
    const result = response.data;

    if (result?.message) {
      fetchListOfBlogs();
      //navigate(0);
    }
  };

  const handleEditBlog = async (getCurrentBlogItem) => {
    console.log(getCurrentBlogItem);
    navigate("/add-blog", { state: { getCurrentBlogItem } });
  };

  useEffect(() => {
    fetchListOfBlogs();
  }, []);

  return (
    <div className={classes.wrapper}>
      <h1>Blog List</h1>
      {pending ? (
        <h1>Loading.. Blogs ! Please wait</h1>
      ) : (
        <div className={classes.blogList}>
          {blogList && blogList.length ? (
            blogList.map((blogItem) => (
              <div key={blogItem._id}>
                <p>{blogItem.title}</p>
                <p>{blogItem.description}</p>

                <FaEdit size={30} onClick={() => handleEditBlog(blogItem)} />
                <FaTrash
                  size={30}
                  onClick={() => handleDeleteBlog(blogItem._id)}
                />
              </div>
            ))
          ) : (
            <h3>No Blogs Added</h3>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
