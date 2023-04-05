import persianJs from "persian-number-js";
import React, { useEffect, useRef, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { v4 } from "uuid";
import LoadingView from "../../components/globalLoading/LoadingView";
import { useDialogContext } from "../../context/dialogStore";
import { getJuz, getPage, getSurah } from "../../store/slices/surah";
import Setting from "./components/settings/setting";
import "./read.css";

const getPreviousAyahNb = (pages, index) => {
  let sum = 0;
  console.log(pages, index);
  for (let i = 0; i < index; i++) {
    const page = pages[i];
    sum += page?.ayahs?.length;
  }
  return sum;
};

const Read = () => {
  const { showPopup } = useDialogContext();
  const { id: nbSurah, page: SuarahPage, juz: nbJuz } = useParams();
  const [surah, setSurah] = useState(null);
  const dispatch = useDispatch();
  const { audio } = useSelector((state) => state.audio);
  let { surahs, loading, error, page, juz } = useSelector(
    (state) => state.surah
  );
  const audioElement = document.getElementById("audio");
  const [currentAyah, setCurrentAyah] = useState(null);
  const [currentWord, setCurrentWord] = useState(null);
  const QuranFollow = audio?.chapter_id === +nbSurah;

  audioElement?.addEventListener("timeupdate", (event) => {
    const { verse_timings } = audio || {};
    const slideCurrentTime = audioElement?.currentTime * 1000;
    const currentAyah = verse_timings?.find(
      (verse) =>
        slideCurrentTime >= verse?.timestamp_from &&
        slideCurrentTime <= verse?.timestamp_to
    );
    const currentWord = currentAyah?.segments?.find(
      (word) => slideCurrentTime >= word[1] && slideCurrentTime <= word[2]
    );
    if (currentAyah && currentWord) {
      setCurrentAyah(currentAyah);
      setCurrentWord(currentWord);
    }
  });

  useEffect(() => {
    if (nbSurah) {
      const surahExist = surahs.find((surah) => surah.number == nbSurah);
      const params = { surah: nbSurah };
      if (!surahExist) dispatch(getSurah(params));
    } else if (SuarahPage) {
      dispatch(getPage({ page: SuarahPage }));
    } else if (nbJuz) {
      dispatch(getJuz({ juz: nbJuz }));
    }
  }, [nbSurah, SuarahPage]);

  useEffect(() => {
    if (error) showPopup(error.data.message);
  }, [error]);

  useEffect(() => {
    setSurah(surahs.find((surah) => surah.number == nbSurah));
  }, [surahs, nbSurah]);

  useEffect(() => {
    if (!currentWord) return;
    const [scollElement] = document.getElementsByClassName("read");
    const [activeElement] = document.getElementsByClassName("activeAyah");
    const elementPosition = activeElement?.offsetTop;
    scollElement.scrollTo({
      top: elementPosition - 100,
      behavior: "smooth",
    });
  }, [currentAyah]);

  const getPages = () => {
    if (nbSurah) return surah?.pages;
    else if (nbJuz) return juz;
    else return page;
  };

  return (
    <div className="content">
      <Setting />
      <div className="read">
        <div className="surah__info">
          <p className="surah_name">{surah?.name}</p>
          {!loading && surah?.number !== 9 && (
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/27/Basmala.svg"
              draggable="false"
            />
          )}
        </div>
        <div className="linesContainer">
          {error ? (
            <p>{error.data.message}</p>
          ) : (
            <LoadingView loading={loading} type="line">
              {getPages()?.map((page, pi) => {
                const activePage = page?.ayahs?.find(
                  (ayah) =>
                    ayah?.numberInSurah ===
                    +currentAyah?.verse_key?.split(":")[1]
                );
                if (activePage) console.log({ activePage, nb: page?._id });
                return (
                  <>
                    <div className="page" key={page?._id}>
                      {page?.ayahs?.map((ayah, i) => {
                        const words = ayah.text
                          .replace(
                            "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ",
                            ""
                          )
                          .split(" ");
                        const nbWords = words.length;
                        activePage &&
                          console.log(
                            getPages()
                              ?.flatMap((page) => page?.ayahs)
                              .findIndex((ay) => ay?._id === ayah?._id)
                          );
                        const activeAyah =
                          activePage &&
                          getPages()
                            ?.flatMap((page) => page?.ayahs)
                            .findIndex((ay) => ay?._id === ayah?._id) +
                            1 ===
                            +currentAyah?.verse_key?.split(":")[1];
                        return words.map((word, j) => {
                          const activeWord =
                            currentWord &&
                            activeAyah &&
                            currentWord[0] === +j + 1;
                          return (
                            <Fragment key={j}>
                              <span
                                key={v4(5)}
                                className={
                                  activeAyah && QuranFollow ? "activeAyah" : ""
                                }
                                id={
                                  activeWord && QuranFollow ? "activeWord" : ""
                                }
                              >
                                {word}
                              </span>
                              {j + 1 === nbWords && (
                                <span className="numberAyah">
                                  {`﴿${persianJs(ayah.numberInSurah)
                                    .englishNumber()
                                    .toString()}﴾`}
                                </span>
                              )}
                            </Fragment>
                          );
                        });
                      })}
                    </div>
                    <div className="page_number">{page?._id}</div>
                  </>
                );
              })}
            </LoadingView>
          )}
        </div>
      </div>
    </div>
  );
};

export default Read;
