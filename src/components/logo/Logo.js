import { Link } from "react-router-dom";
import "./logo.css";

function Logo() {
  return (
    <Link to="/">
      <div className="logo_icon">
        <div className="logo">
          <span>Quran</span>
          <span>Hadith</span>
        </div>
      </div>
    </Link>
  );
}

export default Logo;
