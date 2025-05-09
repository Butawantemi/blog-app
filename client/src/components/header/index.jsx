import { Link } from "react-router-dom";
import classes from "./styles.module.css";

const Header = () => {
  return (
    <div className={classes.header}>
      <h3>Blog App</h3>
      <ul>
        <Link to={"/"}>
          <li>Home</li>
        </Link>
        <Link to={"/add-blog"}>
          <li>Add Blog</li>
        </Link>
      </ul>
    </div>
  );
}

export default Header;