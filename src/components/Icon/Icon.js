import "./icon.css";

function Icon({ image, onClick }) {
  return (
    <img
      src={image}
      alt=""
      width={25}
      height={25}
      onClick={onClick}
      className="icon-side-bar"
    />
  );
}

export default Icon;
