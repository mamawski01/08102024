import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

import Btn from "./Btn";
import { formatFontLabel } from "../utils/helpers";
import { useState } from "react";

export default function Form({ dataStructure = [], dataSave }) {
  const navigate = useNavigate();

  const { register, handleSubmit, formState, reset } = useForm();

  const { errors } = formState;

  async function onSubmit(data) {
    console.log(data);
    dataSave(data);
  }

  function onError() {
    toast.error("Form submission failed. Missing fields required.");
  }

  return (
    <form
      encType="multipart/form-data"
      className="container2"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <div className="flex justify-end">
        <Btn
          color="red"
          text="exit"
          type="button"
          icon={<XMarkIcon></XMarkIcon>}
          onClick={() => navigate(-1)}
        ></Btn>
      </div>
      <div className="[&>*:nth-child(even)]:bg-slate-500/5">
        {dataStructure.map((dataStructure, i) => (
          <InputRow
            key={i}
            rowLabel={dataStructure.rowLabels}
            inputNames={dataStructure.inputNames}
            inputTypes={dataStructure.inputTypes}
            options={dataStructure.options}
            isRequired={dataStructure.isRequired}
            specifyFiles={dataStructure.specifyFiles}
            register={register}
            errors={errors}
          ></InputRow>
        ))}
      </div>
      <div className="mt-6 flex justify-evenly">
        <Btn
          color="blue"
          text="Save"
          type="submit"
          icon={<PlusIcon></PlusIcon>}
        ></Btn>
      </div>
    </form>
  );
}

Form.propTypes = {
  dataStructure: PropTypes.any,
};

function getGridDesign(inputLength) {
  if (inputLength > 1) return " grid-cols-4  sm:px-0  md:grid md:grid-cols-3";
  return "";
}

function InputRow({
  rowLabel = "",
  inputNames = "",
  inputTypes = "",
  options = "",
  isRequired = "",
  specifyFiles = "",
  register = "",
  errors = "",
}) {
  const gridDesign = getGridDesign(inputNames.length);
  const font = formatFontLabel(rowLabel);

  return (
    <div className={`${gridDesign} mt-6 items-center gap-x-2`}>
      <h1
        className="col-span-full flex items-center text-xl font-bold"
        title={font}
      >
        {font}
      </h1>
      {inputNames.map((inputName, i) => (
        <Input
          key={i}
          inputName={inputName}
          inputType={inputTypes[i]}
          specifyFile={specifyFiles[i]}
          options={options[i]}
          isRequired={isRequired[i]}
          register={register}
          errors={errors}
        ></Input>
      ))}
    </div>
  );
}

InputRow.propTypes = {
  errors: PropTypes.any,
  inputNames: PropTypes.any,
  inputTypes: PropTypes.any,
  isRequired: PropTypes.any,
  options: PropTypes.any,
  register: PropTypes.any,
  rowLabel: PropTypes.any,
  specifyFiles: PropTypes.any,
};

function Input({
  inputName = "",
  inputType = "text",
  specifyFile = "",
  options = [],
  isRequired = false,
  register,
  errors,
}) {
  const font = formatFontLabel(inputName);
  const validate = isRequired && {
    required: `This field is required: ${font}`,
  };

  const [filePrev, filePrevSet] = useState("");

  function getFilePreview(e) {
    if (e.target.files[0]) {
      return filePrevSet(URL.createObjectURL(e.target.files[0]));
    } else return filePrevSet("/Asset2.png");
  }

  const style =
    "w-full rounded-lg border border-gray-400 bg-slate-700 px-4 py-2 placeholder:text-sky-500 hover:ring hover:ring-gray-500 focus:outline-none focus:ring focus:ring-gray-500";

  return (
    <div className="my-auto h-full w-full">
      <label htmlFor={inputName} className="font-bold" title={font}>
        {font}
      </label>

      {["text", "date", "email", "password"].includes(inputType) && (
        <input
          type={inputType}
          placeholder={font}
          id={inputName}
          name={inputName}
          className={style}
          autoComplete="off"
          title={font}
          {...register(inputName, validate)}
        />
      )}

      {["option"].includes(inputType) && (
        <select
          id={inputName}
          className="w-full rounded-lg border border-gray-400 bg-slate-700 px-4 py-2 text-white hover:border-gray-500 focus:border-gray-500 focus:outline-none focus:ring focus:ring-gray-500"
          title={font}
          {...register(inputName, validate)}
        >
          {options.map((option, i) => (
            <option key={i} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}

      {[".txt", ".png,.jpg,.jpeg"].includes(specifyFile) && (
        <div>
          <input
            type={inputType}
            placeholder={font}
            id={inputName}
            name={inputName}
            className={`${style} ${inputType === "file" && "cursor-pointer"}`}
            title={font}
            {...register(inputName, validate)}
            onChange={(e) => getFilePreview(e)}
            accept={specifyFile}
          ></input>
          <img
            src={filePrev || "/Asset2.png"}
            alt=""
            className="mx-auto mt-2 h-auto w-2/6"
          />
        </div>
      )}

      {["textarea"].includes(inputType) && (
        <textarea
          id={inputName}
          autoComplete="off"
          placeholder={font}
          className="w-full rounded-lg border border-gray-400 bg-slate-700 px-4 py-2 placeholder:text-sky-500 focus:outline-none focus:ring focus:ring-gray-500"
          title={font}
          {...register(inputName, validate)}
        ></textarea>
      )}

      {errors?.[inputName]?.message && (
        <p className="font-bold text-red-500">{errors?.[inputName]?.message}</p>
      )}
    </div>
  );
}

Input.propTypes = {
  errors: PropTypes.any,
  inputName: PropTypes.any,
  inputType: PropTypes.any,
  isRequired: PropTypes.any,
  options: PropTypes.any,
  register: PropTypes.any,
  specifyFile: PropTypes.any,
};
