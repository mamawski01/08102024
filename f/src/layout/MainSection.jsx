import PropTypes from "prop-types";

export default function MainSection({ children }) {
  return <section className="mainSection">{children}</section>;
}

MainSection.propTypes = {
  children: PropTypes.any,
};
