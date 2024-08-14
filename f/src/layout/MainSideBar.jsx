import PropTypes from "prop-types";

export default function MainSideBar({ children }) {
  return <aside className="mainSidebar">{children}</aside>;
}

MainSideBar.propTypes = {
  children: PropTypes.any,
};
