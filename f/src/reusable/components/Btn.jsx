import PropTypes from "prop-types";

import { formatFontLabel, onHoverBgColor } from "../utils/helpers";
export default function Btn({
  text = "",
  type = "",
  color = "",
  onClick = null,
  icon = "",
}) {
  const hoverBgColor = onHoverBgColor(color);
  const font = formatFontLabel(text);

  return (
    <button
      title={text}
      onClick={onClick}
      type={type}
      className={`${hoverBgColor} relative flex items-center gap-1 rounded-md p-1 px-2 font-bold tracking-wider`}
    >
      <span className="w-7">{icon.icon}</span>
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
  bgColorActive: PropTypes.any,
};
