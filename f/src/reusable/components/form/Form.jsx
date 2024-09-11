import PropTypes from "prop-types";
import {
  PencilIcon,
  PlusCircleIcon,
  SparklesIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Btn from "../Btn";
import { formatFontLabel } from "../../utils/helpers";
import { onSubmitForm } from "./onSubmitForm";
import { fSocket } from "../../../api/apis/api";

const defaultDataStructure = [
  [
    {
      rowLabels: "uploadAttendance",
      inputNames: ["firstName", "status", "image"],
      inputTypes: ["text", "option", "file"],
      isRequired: [true, true, true],
      options: [[], ["single", "married", "widowed", "divorced"]],
      specifyFiles: [[], [], [".png,.jpg,.jpeg"]],
    },
  ],
];

const FormContext = createContext();

export default function Form({
  dataStructure = defaultDataStructure,
  dataSave = console.log,
  dataEdit = console.log,
  dataDelete = console.log,
  onSubmitRule = "simple",
  editDefaultVal = null,
  fIOFindOne = "",
  bIOFindOne = "",
  fIOSaveOne = "",
  fIOUpdateOne = "",
  fIODeleteOne = "",
}) {
  const navigate = useNavigate();
  const [filePrev, filePrevSet] = useState();
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;
  function onError() {
    toast.error("Form submission failed. Missing fields required.");
  }

  //editing logic
  const { id } = useParams();
  //useDataGetter manual
  useEffect(() => {
    if (id) {
      async function fetchData() {
        await editDefaultVal(fIOFindOne, id);
      }
      fetchData();
    }
    return () => {};
  }, [editDefaultVal, fIOFindOne, id]);

  const [apiData, apiDataSet] = useState();
  const editImagePreview = apiData?.image;

  fSocket.on(bIOFindOne, (data) => {
    apiDataSet(data.data);
    reset(data.data);
  });

  const edit = Boolean(apiData?._id);

  function onSubmit(data) {
    edit
      ? dataEdit(fIOUpdateOne, id, onSubmitForm(data, onSubmitRule))
      : dataSave(fIOSaveOne, onSubmitForm(data, onSubmitRule));
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
        {dataStructure[edit ? 1 : 0].map((dataStructure, i) => (
          <FormContext.Provider
            key={i}
            value={{
              filePrev,
              filePrevSet,
              register,
              errors,
              rowLabel: dataStructure.rowLabels,
              inputNames: dataStructure.inputNames,
              inputTypes: dataStructure.inputTypes,
              options: dataStructure.options,
              isRequired: dataStructure.isRequired,
              specifyFiles: dataStructure.specifyFiles,
              editImagePreview,
            }}
          >
            <InputRow></InputRow>
          </FormContext.Provider>
        ))}
      </div>

      <div className="mt-6 flex justify-evenly">
        <Btn
          text={edit ? "update" : "Save"}
          type="submit"
          color={edit ? "yellow" : "blue"}
          icon={
            edit ? (
              <PencilIcon color="yellow" />
            ) : (
              <PlusCircleIcon color="aquamarine" />
            )
          }
        ></Btn>
        <Btn
          color="indigo"
          text="clear"
          type="reset"
          icon={<SparklesIcon color="violet" />}
          onClick={() => {
            toast.success("Form cleared successfully");
            filePrevSet("/Asset2.png");
            reset({});
          }}
        ></Btn>
        {edit && (
          <Btn
            text={"delete"}
            color={"red"}
            type="button"
            icon={<TrashIcon color="red"></TrashIcon>}
            onClick={() => dataDelete(fIODeleteOne, apiData?._id)}
          ></Btn>
        )}
        <Btn
          color="red"
          text="exit"
          type="button"
          icon={<XMarkIcon></XMarkIcon>}
          onClick={() => navigate(-1)}
        ></Btn>
      </div>
    </form>
  );
}

Form.propTypes = {
  dataStructure: PropTypes.any,
  dataSave: PropTypes.any,
  dataEdit: PropTypes.any,
  dataDelete: PropTypes.any,
  onSubmitRule: PropTypes.any,
  editDefaultVal: PropTypes.any,
  bIOFindOne: PropTypes.any,
  fIOFindOne: PropTypes.any,
  fIOSaveOne: PropTypes.any,
  fIOUpdateOne: PropTypes.any,
  fIODeleteOne: PropTypes.any,
};

function getGridDesign(inputLength) {
  if (inputLength > 1) return " grid-cols-4  sm:px-0  md:grid md:grid-cols-3";
  return "";
}

function InputRow() {
  const {
    rowLabel = "",
    inputNames = "",
    inputTypes = "",
    options = "",
    isRequired = "",
    specifyFiles = "",
  } = useContext(FormContext);

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
}) {
  const { filePrevSet, register, filePrev, errors, editImagePreview } =
    useContext(FormContext);

  const font = formatFontLabel(inputName);
  const validate = isRequired && {
    required: `This field is required: ${font}`,
  };

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
          className={`${style} text-white`}
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

      {["file"].includes(inputType) && (
        <div>
          <input
            type={inputType}
            placeholder={font}
            id={inputName}
            name={inputName}
            className="w-full cursor-pointer rounded-lg border border-gray-400 bg-slate-700 placeholder:text-2xl"
            title={font}
            {...register(inputName, validate)}
            onChange={(e) => getFilePreview(e)}
            accept={specifyFile}
          ></input>
          <img
            src={filePrev || editImagePreview || "/Asset2.png"}
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
