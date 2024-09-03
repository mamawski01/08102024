import PropTypes from "prop-types";

import { formatFontLabel, onHoverBgColor } from "../utils/helpers";
import { HeartIcon } from "@heroicons/react/24/solid";
export default function Btn({
  text = "addText",
  type = "button",
  color = "green",
  onClick = null,
  icon = <HeartIcon color="red" />,
}) {
  const hoverBgColor = onHoverBgColor(color);
  const font = formatFontLabel(text);

  return (
    <button
      title={text}
      onClick={onClick}
      type={type}
      className={`${hoverBgColor} btnAndNavLinkerAndOptions`}
    >
      <span className="w-7">{icon}</span>
      <span className="hidden md:block">{font}</span>
    </button>
  );
}

Btn.propTypes = {
  type: PropTypes.any,
  color: PropTypes.any,
  onClick: PropTypes.any,
  icon: PropTypes.any,
  text: PropTypes.any,
};
