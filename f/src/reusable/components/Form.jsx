import PropTypes from "prop-types";
export default function Form({
  dataStructure = [],
  dataSave = null,
  dataEdit = null,
  dataDelete = null,
  dataDefaultVal = null,
}) {
  return (
    <form encType="multipart/form-data" className="container2">
      Form
    </form>
  );
}

Form.propTypes = {
  dataStructure: PropTypes.any,
  dataDefaultVal: PropTypes.any,
  dataDelete: PropTypes.any,
  dataEdit: PropTypes.any,
  dataSave: PropTypes.any,
};
