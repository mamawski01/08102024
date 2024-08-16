import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

import { formatFontLabel, onHoverBgColor } from "../utils/helpers";

export default function Options({
  text = "",
  type = "",
  color = "",
  icon = "",
  options = [],
  position = "right-0",
}) {
  const [showOptions, showOptionsSet] = useState(false);

  const optionRef = useRef();

  useEffect(() => {
    function callBack(e) {
      if (!optionRef.current.contains(e.target)) {
        showOptionsSet(false);
      }
    }
    document.addEventListener("click", callBack);
    //cleaning
    return () => {
      document.removeEventListener("click", callBack);
    };
  }, [showOptionsSet, showOptions]);

  const hoverBgColor = onHoverBgColor(color);
  const font = formatFontLabel(text);
  return (
    <div className="relative flex gap-2">
      <button
        ref={optionRef}
        title={text}
        type={type}
        className={`${hoverBgColor} btnAndNavLinkerAndOptions ${showOptions && "active"} `}
        onClick={() => showOptionsSet(!showOptions)}
      >
        <span className="w-7">{icon}</span>
        <span className="hidden md:block">{font}</span>
        {showOptions && (
          <span className="absolute -right-1 -top-1 inline-flex h-3 w-3 rounded-full bg-green-600">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
          </span>
        )}
      </button>
      {showOptions && (
        <ul className={`bg absolute ${position} top-10 flex flex-col gap-1`}>
          {options.map((option, i) => (
            <li className="w-full" key={i}>
              {option.option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

Options.propTypes = {
  color: PropTypes.any,
  icon: PropTypes.any,
  text: PropTypes.any,
  type: PropTypes.any,
  options: PropTypes.any,
  position: PropTypes.any,
};
