import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function Logo({ text = "Add text", link = "/", imgSrc }) {
  return (
    <Link to={link}>
      <div className="flex items-center" title={text}>
        <img src={imgSrc} alt={text} className="w-10" />
        <h3 className="font-bold tracking-wider">{text}</h3>
      </div>
    </Link>
  );
}

Logo.propTypes = {
  imgSrc: PropTypes.any,
  link: PropTypes.string,
  text: PropTypes.string,
};
