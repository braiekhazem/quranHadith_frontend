import "./quran.css";
import love from "./../../assets/icon/heart-regular.svg";
import love2 from "./../../assets/icon/love.svg";
import { useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../loading/Loading";
import { useDispatch } from "react-redux";
import { addFavorites, deleteFavorites } from "../../store/slices/favorites";
import { Tooltip } from "antd";

export const refrechData = (router) => {
  router.replace(router.asPath, undefined, { scroll: false });
};

function QuranItem({ surah, favorites }) {
  const [isLoading, setIsLoading] = useState(false);
  const { englishName, number, englishNameTranslation, name, ayahsNumber } =
    surah;
  const dispach = useDispatch();
  const favorite = favorites?.find((fav) => fav.surahID == surah._id);

  const addToBookMark = async () => {
    setIsLoading(true);
    let res;
    if (!favorite) {
      dispach(addFavorites(surah._id));
    } else dispach(deleteFavorites(surah._id));

    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className="item">
      <div className="firstCol-item">
        <span>{number}</span>
        <span className="favIcon" onClick={addToBookMark}>
          {isLoading ? (
            <Loading size={{ w: 18, h: 18 }} />
          ) : (
            <img
              src={favorite ? love2 : love}
              alt="err"
              width={20}
              height={20}
            />
          )}
        </span>
      </div>
      <Link to={`read/${number}`} className="quranLink">
        <div className="surahContent">
          <div className="surah">
            <Tooltip title={englishName}>
              <p className="surahName textOver">{englishName}</p>
            </Tooltip>
            <Tooltip title={englishNameTranslation}>
              <p className="surahNameEn textOver">{englishNameTranslation}</p>
            </Tooltip>
          </div>
          <div className="surahSec">
            <Tooltip title={name}>
              <p className="surahName arabName textOver">{name}</p>
            </Tooltip>
            <p className="surahNameEn surahNameAr textOver">
              {ayahsNumber} ayahs
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default QuranItem;
