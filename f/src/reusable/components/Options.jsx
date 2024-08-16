import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

import { formatFontLabel, onHoverBgColor } from "../utils/helpers";

export default function Options({
  text = "",
  type = "",
  color = "",
  icon = "",
  options = [],
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
    <div className="relative flex gap-4">
      <button
        ref={optionRef}
        title={text}
        type={type}
        className={`${hoverBgColor} relative flex items-center gap-1 rounded-md p-1 px-2 font-bold tracking-wider`}
        onClick={() => showOptionsSet(!showOptions)}
      >
        <span className="w-7">{icon.icon}</span>
        <span className="hidden md:block">{font}</span>
      </button>
      {showOptions && (
        <div className="bg absolute top-10">
          {options.map((option, i) => (
            <li className="flex w-full flex-col p-3" key={i}>
              {option.option}
            </li>
          ))}
        </div>
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
};
