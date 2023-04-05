import React from "react";
import "./loadingView.css";

const LoadingQuranItem = () => {
  return <div className="item loading-item animated-background"></div>;
};

const LoadingLineItem = () => {
  return <div className="item-line animated-background"></div>;
};

const LoadingSettingItem = () => {
  return <div className="item-setting animated-background"></div>;
};

const DefaultLoading = () => {
  return <div className="">loading...</div>;
};

const LoadingComponents = {
  quran: LoadingQuranItem,
  line: LoadingLineItem,
  setting: LoadingSettingItem,
};

function LoadingView({ children, loading, type }) {
  const loadingItemsArray = Array.from({ length: 20 }).fill("0");
  const Component = LoadingComponents[type];

  return (
    <>
      {loading ? (
        <div className="loading-view">
          {Component ? (
            <>
              {loadingItemsArray.map((_, i) => (
                <Component key={i} />
              ))}
            </>
          ) : (
            <DefaultLoading />
          )}
        </div>
      ) : (
        children
      )}
    </>
  );
}

export default LoadingView;
