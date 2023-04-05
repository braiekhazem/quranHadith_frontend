import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDialogContext } from "../../context/dialogStore";
import Audio from "../audio/Audio";
import Header from "../header/Header";
import SideBar from "../sideBar/SideBar";
import "./mainLayout.css";

const Layout = ({ children }) => {
  const { audio } = useSelector((state) => state.audio);
  const { showPopup } = useDialogContext();
  useEffect(() => {
    if (audio) {
      showPopup("you already have an audio", "success");
    }
  }, [audio]);
  return (
    <div className="sectionMain global-centring">
      <div className="main">
        <>
          <SideBar />
          <div className="headerContent">
            <Header />
            {children}
          </div>
        </>
      </div>
      {audio && <Audio audioFile={audio} />}
    </div>
  );
};

export default Layout;
