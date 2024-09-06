import PropTypes from "prop-types";

export default function MainSideBar({ children }) {
  return (
    <aside className="contentHeight hidden w-16 border-r border-gray-300/20 p-1 text-center md:block">
      {children}
    </aside>
  );
}

MainSideBar.propTypes = {
  children: PropTypes.any,
};
