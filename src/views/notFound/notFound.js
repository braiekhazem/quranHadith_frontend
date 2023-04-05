import { Link } from "react-router-dom";
import notFound from "./assets/icons/Not_found.svg";
import "./_notFound.css";

const NotFound = () => {
  return (
    <div className="notFoundView">
      <span>
        <img src={notFound} alt="error" />
      </span>
      <p>Whoops! Lost In Space? </p>
      <span>
        The page you're looking for isn't found :( <br></br> We sugget you back
        home
      </span>
      <Link to={"/"}>
        <div className="backHome-button">Back To Home</div>
      </Link>
    </div>
  );
};

export default NotFound;
