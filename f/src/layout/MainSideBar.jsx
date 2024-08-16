import PropTypes from "prop-types";

export default function MainSideBar({ children }) {
  return (
    <aside className="hidden h-[calc(100vh-3.65rem)] w-16 border-r border-gray-300/20 p-1 text-center md:block">
      {children}
    </aside>
  );
}

MainSideBar.propTypes = {
  children: PropTypes.any,
};
