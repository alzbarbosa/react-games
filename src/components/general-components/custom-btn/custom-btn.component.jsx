import "./custom-btn.styles.css";

const CustomBtn = ({ text, handler }) => {
  return (
    <>
      <button className="btn-die" onClick={handler}>
        {text}
      </button>
    </>
  );
};

export default CustomBtn;
