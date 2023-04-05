import "./sideBar.css";
import quranImg from "./../../assets/icon/quran.jpg";
import read from "./../../assets/icon/book-open-reader-solid.svg";
import love from "./../../assets/icon/heart-regular.svg";
import money from "./../../assets/icon/dollar-sign-solid.svg";
import send from "./../../assets/icon/paper-plane-regular.svg";
import logoutImg from "./../../assets/icon/arrow-right-from-bracket-solid.svg";
import setting from "./../../assets/icon/gears-solid.svg";
import { Link, useLocation } from "react-router-dom";
import Icon from "../Icon/Icon";
import { useStore } from "../../context/JWTAuthContext";

function SideBar() {
  const { logout } = useStore();
  const { pathname: asPath } = useLocation();
  const logoutUser = () => {
    logout();
  };
  return (
    <div className="sideBar">
      <div className="firstCol">
        <img src={quranImg} alt="err" width={45} height={45} />
        <div className="listRoute">
          <ul>
            <Link to="/">
              <li className={asPath === "/" ? "activeLink" : ""}>
                <Icon image={read} />
              </li>
            </Link>
            <Link to="/">
              <li className={asPath === "/favorites" ? "activeLink" : ""}>
                <Icon image={love} />
              </li>
            </Link>
            <Link to="/">
              <li className={asPath === "/send" ? "activeLink" : ""}>
                <Icon image={send} />
              </li>
            </Link>
            <Link to="/">
              <li className={asPath === "/buy" ? "activeLink" : ""}>
                <Icon image={money} />
              </li>
            </Link>
          </ul>
        </div>
      </div>
      <div className="setting-icons">
        <Icon image={setting} />
        <Icon image={logoutImg} onClick={logoutUser} />
      </div>
    </div>
  );
}

export default SideBar;
