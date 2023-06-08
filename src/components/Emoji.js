import React from "react";

const Emoji = (props) => {
  const { symbol, label, selected, onSelect } = props;

  const handleClick = () => {
    onSelect(symbol, label);
  };

  return (
    <span
      className={`emoji ${selected ? "selected" : ""}`}
      role="img"
      aria-label={label ? label : ""}
      aria-hidden={label ? "false" : "true"}
      onClick={handleClick}
    >
      {symbol}
    </span>
  );
};

export default Emoji;
