import PropTypes from "prop-types";

export default function Main({ children }) {
  return (
    <main className="contentHeight mx-auto w-full overflow-y-auto md:inline-block">
      {children}
    </main>
  );
}

Main.propTypes = {
  children: PropTypes.any,
};
