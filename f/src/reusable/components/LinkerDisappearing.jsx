import PropTypes from "prop-types";
import { Link, useLocation, useParams } from "react-router-dom";

import { formatFontLabel, onHoverBgColor } from "../utils/helpers";
import { LinkIcon } from "@heroicons/react/24/solid";

export default function LinkerDisappearing({
  text = "add LinkerDisappearing",
  icon = <LinkIcon color="red" />,
  to = "/",
  color = "blue",
}) {
  const font = formatFontLabel(text);
  const hoverBgColor = onHoverBgColor(color);

  const { pathname } = useLocation();
  const { id } = useParams();
  const samePath = id ? `/${to}/${id}` : `/${to}`;
  console.log(pathname);
  console.log(samePath);
  return (
    <Link
      title={font}
      to={to}
      className={`${hoverBgColor} ${pathname === samePath && "hidden"} btnAndNavLinkerAndOptionsAndLinkAndLinkerDisappearing absolute`}
    >
      <span className="w-7">{icon}</span>
      <span className="hidden flex-wrap md:flex">{font}</span>
    </Link>
  );
}

LinkerDisappearing.propTypes = {
  color: PropTypes.any,
  icon: PropTypes.any,
  text: PropTypes.any,
  to: PropTypes.any,
  url: PropTypes.any,
};
