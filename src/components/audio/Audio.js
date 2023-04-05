import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { actionAudio, getAudio } from "../../store/slices/audio";
import play from "./../../assets/icon/play-solid.svg";
import pause from "./../../assets/icon/pause-solid.svg";
import next from "./../../assets/icon/forward-solid.svg";
import previous from "./../../assets/icon/backward-solid.svg";
import volumeHight from "./../../assets/icon/volume-high-solid.svg";
import volumeMedium from "./../../assets/icon/volume-low-solid.svg";
import volumeoff from "./../../assets/icon/volume-off-solid.svg";
import "./audio.css";
import { useNavigate } from "react-router-dom";

const calculateTime = (secs) => {
  const minutes = Math.floor(secs / 60);
  const seconds = Math.floor(secs % 60);
  const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${minutes}:${returnedSeconds}`;
};

function Audio({ audioFile }) {
  const {
    audio_url: audioUrl,
    chapter_id,
    duration,
    verse_timings,
  } = audioFile || {};
  const [audioPlay, setAudioPlay] = useState(true);
  const [audioDuration, setAudioDuration] = useState(duration);
  const [audioCurrentTime, setAudioCurrentTime] = useState(null);
  const [slideCurrentTime, setSlideCurrentTime] = useState(0);
  const [volume, setVolume] = useState(100);
  const audioRef = useRef(null);

  const currentAyah = verse_timings?.find(
    (verse) =>
      slideCurrentTime * 1000 >= verse?.timestamp_from &&
      slideCurrentTime * 1000 <= verse?.timestamp_to
  );
  const currentWord = currentAyah?.segments?.find(
    (word) =>
      slideCurrentTime * 1000 >= word[0] && slideCurrentTime * 1000 <= word[1]
  );

  const currentSurahNumber = chapter_id;

  useEffect(() => {
    dispatch(actionAudio.setAyah(currentAyah));
    dispatch(actionAudio.setWord(currentWord));
  }, [currentAyah, currentWord]);

  const navigate = useNavigate();

  useEffect(() => {
    audioRef.current.pause();
    audioRef.current.load();
    audioRef.current.play();
    setAudioPlay(true);
    setAudioDuration(null);
    setAudioCurrentTime(null);
    setSlideCurrentTime(0);
    setVolume(100);
  }, [audioUrl]);

  const dispatch = useDispatch();

  const nextSurah = () => {
    const nextNumber = currentSurahNumber == 114 ? 1 : currentSurahNumber + 1;
    dispatch(getAudio({ surah: nextNumber }));
    navigate("/read/" + nextNumber);
  };

  const previousSurah = () => {
    const previousNumber =
      currentSurahNumber == 1 ? 114 : currentSurahNumber - 1;
    dispatch(actionAudio.setAudio(previousNumber));
    navigate("/read/" + previousNumber);
  };

  const handleAudioEnd = () => {
    dispatch(actionAudio.resetAudio());
  };

  const toggleAudio = () => {
    setAudioPlay(!audioPlay);
  };

  useEffect(() => {
    if (audioPlay) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [audioPlay]);

  const AudioDuration = () => {
    setAudioDuration(audioRef.current.duration);
  };

  const timeUpdateHandler = () => {
    var r = document.querySelector(":root");
    r.style.setProperty(
      "--width-slide-duration",
      (audioRef.current.currentTime / Math.floor(audioDuration)) * 100 + "%"
    );
    setAudioCurrentTime(audioRef.current.currentTime);
    setSlideCurrentTime(Math.floor(audioRef.current.currentTime));
  };

  const slideDurationHandler = (e) => {
    setSlideCurrentTime(e.target.value);
    setAudioCurrentTime(e.target.value);
    audioRef.current.currentTime = e.target.value;
    var r = document.querySelector(":root");
    r.style.setProperty(
      "--width-slide-duration",
      (audioRef.current.currentTime / Math.floor(audioDuration)) * 100 + "%"
    );
  };

  useEffect(() => {
    audioRef.current.volume = volume / 100;
  }, [volume]);

  const slideVolumeHandler = (e) => {
    setVolume(e.target.value);
  };

  return (
    <div className="audio">
      <audio
        ref={audioRef}
        onEnded={handleAudioEnd}
        onLoadedMetadata={AudioDuration}
        onTimeUpdate={timeUpdateHandler}
        id="audio"
      >
        <source src={audioUrl} type="audio/mpeg" />
        Your browser does not support the audio tag.
      </audio>

      <div className="currentTime">
        <span className="time">{calculateTime(audioCurrentTime)}</span>
      </div>
      <div className="PlaybackControls">
        <span className="btnCustom" onClick={handleAudioEnd}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.782 4.032a.575.575 0 1 0-.813-.814L7.5 6.687 4.032 3.218a.575.575 0 0 0-.814.814L6.687 7.5l-3.469 3.468a.575.575 0 0 0 .814.814L7.5 8.313l3.469 3.469a.575.575 0 0 0 .813-.814L8.313 7.5l3.469-3.468Z"
              fill="currentColor"
              fill-rule="evenodd"
              clip-rule="evenodd"
            ></path>
          </svg>
        </span>
        <div className="PlaybackControlsBtns">
          <span className="btnCustom" onClick={previousSurah}>
            <img src={previous} alt="error" title="previous surah" />
          </span>
          <span className="btnCustom" onClick={toggleAudio}>
            <img
              src={audioPlay ? pause : play}
              alt="error"
              title={audioPlay ? "pause" : "play"}
            />
          </span>
          <span className="btnCustom" onClick={nextSurah}>
            <img src={next} alt="error" title="next surah" />
          </span>
        </div>
      </div>
      <div className="duration">
        <div className="volume">
          <img
            src={
              volume >= 0 && volume < 2
                ? volumeoff
                : volume < 60 && volume > 0
                ? volumeMedium
                : volumeHight
            }
            alt="error"
            onClick={() => setVolume(volume === 0 ? 100 : 0)}
          />

          <div className="slideVolume">
            <input
              type="range"
              value={volume}
              max="100"
              onChange={slideVolumeHandler}
            />
          </div>
        </div>
        <span className="time">
          {audioDuration !== "NaN" && calculateTime(audioDuration)}
        </span>
      </div>
      <div className="slideDuration">
        <input
          type="range"
          value={slideCurrentTime}
          max={Math.floor(audioDuration)}
          onChange={slideDurationHandler}
          className="durationSurah"
        />
      </div>
    </div>
  );
}

export default Audio;
