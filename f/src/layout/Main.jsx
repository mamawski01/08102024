import PropTypes from "prop-types";

export default function Main({ children }) {
  return (
    <main className="mx-auto h-[calc(100vh-3.65rem)] w-full overflow-y-auto p-2 md:inline-block">
      {children}
    </main>
  );
}

Main.propTypes = {
  children: PropTypes.any,
};
