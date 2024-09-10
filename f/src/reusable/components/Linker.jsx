import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { formatFontLabel, onHoverBgColor } from "../utils/helpers";
import { LinkIcon } from "@heroicons/react/24/solid";

export default function Linker({
  text = "add Linker",
  icon = <LinkIcon color="red" />,
  to = "/",
  color = "indigo",
}) {
  const font = formatFontLabel(text);
  const hoverBgColor = onHoverBgColor(color);

  return (
    <Link
      title={font}
      to={to}
      className={`${hoverBgColor} btnAndNavLinkerAndOptionsAndLinkAndLinkerDisappearing`}
    >
      <span className="w-7">{icon}</span>
      <span className="hidden md:block">{font}</span>
    </Link>
  );
}

Linker.propTypes = {
  color: PropTypes.any,
  icon: PropTypes.any,
  text: PropTypes.any,
  to: PropTypes.any,
  url: PropTypes.any,
};
