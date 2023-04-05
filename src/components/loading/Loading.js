import loading from "./../../assets/icon/spinner-solid.svg";
import "./loading.css";

function Loading({ size }) {
  const { w, h } = size;
  return (
    <div
      className="loading"
      style={{
        height: `${h}px`,
        width: `${w}px`,
      }}
    >
      <img src={loading} alt="load" />
    </div>
  );
}

export default Loading;
