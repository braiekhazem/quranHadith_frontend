import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useParams } from "react-router-dom";
import { v4 } from "uuid";
import ExitIcon from "../../../../components/exit/ExitIcon";
import LoadingView from "../../../../components/globalLoading/LoadingView";
import { useDialogContext } from "../../../../context/dialogStore";
import { getQuran } from "../../../../store/slices/quran";
import "./setting.css";
// import ExitIcon from "../exit/ExitIcon";

const getArrayFn = (len) => new Array(len);

const filterQuran = [
  { id: v4(10), type: "surah", active: true },
  { id: v4(10), type: "juz", active: false },
  { id: v4(10), type: "page", active: false },
];

function Setting({ open, toggle, id }) {
  const { id: surah, juz, page } = useParams();
  const { showPopup } = useDialogContext();
  const [filter, setFilter] = useState(filterQuran);
  const [activeFilter, setActiveFilter] = useState(
    surah ? "surah" : juz ? "juz" : "page"
  );
  const [search, setSearch] = useState("");
  const { quran, loading, error } = useSelector((state) => state.quran);
  const setNewFilter = (id) => {
    const newFilter = filter.map((fil) =>
      fil.id === id ? { ...fil, active: true } : { ...fil, active: false }
    );
    setFilter(newFilter);
  };

  useEffect(() => {
    setNewFilter(
      surah ? filterQuran[0]?.id : juz ? filterQuran[1]?.id : filterQuran[2]?.id
    );
    if (error) showPopup(error.data.message);
  }, [error]);

  const dispatch = useDispatch();

  useEffect(() => {
    const { type } = filter.find((fil) => fil.active);
    setActiveFilter(type);
    if (type !== "surah") return;
    const searchParams = { search };
    dispatch(getQuran(searchParams));
  }, [search, dispatch, filter]);

  return (
    <div className="open setting">
      <div className="control">
        <div className="controlContent">
          {filter.map((filter) => (
            <div
              key={filter.id}
              className="controlSection"
              id={filter.active ? "active" : ""}
              onClick={() => setNewFilter(filter.id)}
            >
              {filter.type}
            </div>
          ))}
        </div>
      </div>
      <div className="filterContainer">
        <div className="searchInput">
          <input
            type="text"
            placeholder={`Search ${activeFilter}`}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="contentData">
          <LoadingView loading={loading} type="setting">
            <ul className="dataItem">
              {activeFilter === "surah"
                ? quran.map((item, i) => (
                    <NavLink
                      key={item._id}
                      to={`/read/${item.number}`}
                      className={({ isActive }) =>
                        isActive ? "activeItem" : ""
                      }
                    >
                      <li
                        key={item._id}
                        className={id === item.number ? "activeItem" : ""}
                      >
                        <span>{item.number}</span>
                        <span>{item.englishName}</span>
                      </li>
                    </NavLink>
                  ))
                : activeFilter === "page"
                ? getArrayFn(604)
                    .fill()
                    .map((_, i) => (
                      <NavLink
                        key={id}
                        to={`/read/pages/${i + 1}`}
                        className={({ isActive }) =>
                          isActive ? "activeItem" : ""
                        }
                      >
                        <li key={i} className={id === i ? "activeItem" : ""}>
                          <span>Page</span>
                          <span>{i + 1}</span>
                        </li>
                      </NavLink>
                    ))
                : getArrayFn(30)
                    .fill("")
                    .map((_, i) => (
                      <NavLink
                        key={id}
                        to={`/read/juz/${i + 1}`}
                        className={({ isActive }) =>
                          isActive ? "activeItem" : ""
                        }
                      >
                        <li key={i} className={id === i ? "activeItem" : ""}>
                          <span>Juz</span>
                          <span>{i + 1}</span>
                        </li>
                      </NavLink>
                    ))}
            </ul>
          </LoadingView>
        </div>
      </div>
    </div>
  );
}

export default Setting;
