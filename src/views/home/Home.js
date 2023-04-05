import React, { useEffect, useState } from "react";
import Quran from "../../components/quranContent/quran";
import arrow from "./../../assets/icon/flech.svg";
import "./home.css";
import { v4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { getQuran } from "../../store/slices/quran";
import { getFavorites } from "../../store/slices/favorites";
import LoadingView from "../../components/globalLoading/LoadingView";
import { useDialogContext } from "../../context/dialogStore";
import read from "./../../assets/icon/book-open-reader-solid.svg";
import listened from "./../../assets/icon/headphones-solid.svg";
import { getMyHistory } from "../../store/slices/user";
import { useStore } from "../../context/JWTAuthContext";

const sortBy = [
  { id: v4(10), type: "ayahs", active: false },
  { id: v4(10), type: "number", active: true },
  { id: v4(10), type: "alphabet", active: false },
];

const Home = () => {
  const { user } = useStore();
  const { showPopup } = useDialogContext();
  const [SortBy, setSortBy] = useState(sortBy);
  const activeSort = (id) => {
    const newSortBy = sortBy.map((sort) =>
      sort.id === id ? { ...sort, active: true } : { ...sort, active: false }
    );
    setSortBy(newSortBy);
  };
  const {
    quran,
    loading,
    error: errorQuran,
  } = useSelector((state) => state.quran);
  const { favorites, error } = useSelector((state) => state.favorites);
  const { history } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (favorites.length === 0) dispatch(getFavorites());
    if (quran.length === 0) dispatch(getQuran());
    if (history.length === 0) dispatch(getMyHistory());
    if (error) showPopup(error.data.message);
    if (errorQuran) showPopup(errorQuran.data.message);
  }, [error, errorQuran]);

  return (
    <div className="appContainer">
      <div className="home">
        <div className="sort">
          {SortBy.map((sortBy, i) => (
            <div
              className="sortOp"
              id={sortBy.active ? "activeSort" : ""}
              key={i}
              onClick={() => activeSort(sortBy.id)}
            >
              <p>sort By</p>
              <p className="sortBy">
                <span> {sortBy.type} </span>
                <img
                  src={arrow}
                  alt="err"
                  className={sortBy.active ? "rotateSort" : ""}
                />
              </p>
            </div>
          ))}
        </div>
        <LoadingView loading={loading} type="quran">
          <Quran data={quran} sortBy={SortBy} favorites={favorites} />
        </LoadingView>
      </div>
      <div className="user">
        <div className="section user-info">
          <div className="name">
            <p className="first">{user?.name} ,</p>
            <p className="last" title={user?.email}>
              {user?.email}
            </p>
          </div>
          {/* <div className="photo">
            <img src={user?.photo || read} alt="err" />
          </div> */}
        </div>
        <div className="section user-info">
          <div className="data">
            <p className="title">Last Read </p>
            <p className="lastsurah">al-fatiha</p>
          </div>
          <div className="history-icon">
            <img src={read} alt="err" />
          </div>
        </div>
        <div className="section user-info">
          <div className="data">
            <p className="title">Last listened</p>
            <p className="lastsurah">al-fatiha</p>
          </div>
          <div className="history-icon">
            <img src={listened} alt="err" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
