import PropTypes from "prop-types";

export default function MainSection({ children }) {
  return (
    <section className="container mx-auto flex h-[80vh]">{children}</section>
  );
}

MainSection.propTypes = {
  children: PropTypes.any,
};
