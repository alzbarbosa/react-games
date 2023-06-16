import "./display-count.styles.css";

const DisplayCount = ({ text, value }) => {
  return (
    <p className="count-tries">
      {text} {value}
    </p>
  );
};

export default DisplayCount;
