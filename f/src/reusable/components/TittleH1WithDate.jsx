import PropTypes from "prop-types";
import Datepicker from "react-tailwindcss-datepicker";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

import Btn from "./Btn";
import TittleH1 from "./TittleH1";

export default function TittleH1WithDate({
  datePicker = (
    <Datepicker
      disabled={true}
      readOnly={true}
      inputId="datePicker"
      displayFormat="YYYY-MMM-DD"
      separator="to"
      showShortcuts={true}
      configs={{
        shortcuts: {
          today: "Today",
        },
      }}
    />
  ),
  title = "Add Tittle",
  children,
}) {
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 z-10 bg-slate-950 pb-1">
      <div className="flex w-full items-center justify-end gap-5">
        <div className="z-20 w-64">
          <label htmlFor="datePicker">Date Range:</label>
          {datePicker}
        </div>
        <Btn
          color="red"
          text="exit"
          type="button"
          icon={<XMarkIcon></XMarkIcon>}
          onClick={() => navigate(-1)}
        ></Btn>
      </div>
      <TittleH1 disableSticky={true}>{title}</TittleH1>
      {children}
    </div>
  );
}

TittleH1WithDate.propTypes = {
  datePicker: PropTypes.any,
  title: PropTypes.any,
  children: PropTypes.any,
};
