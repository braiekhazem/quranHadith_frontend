import "./header.css";
import search from "./../../assets/icon/magnifying-glass-solid.svg";
import listen from "./../../assets/icon/headphones-solid.svg";
import Logo from "../logo/Logo";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actionAudio, getAudio } from "../../store/slices/audio";

function Header() {
  const { pathname } = useLocation();
  const { id: nbSurah } = useParams();
  const dispatch = useDispatch();
  const playAudio = () => {
    dispatch(getAudio({ surah: nbSurah }));
  };
  return (
    <div className="header">
      <Logo />
      <div className="searchLis">
        <div className="search">
          <input type="text" placeholder="search" />
          <img src={search} alt="error" width={20} height={20} />
        </div>
        {pathname.startsWith("/read") && nbSurah && (
          <div className="lis" onClick={playAudio}>
            <img src={listen} alt="err" width={20} height={20} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
