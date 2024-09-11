import PropTypes from "prop-types";
import { createContext } from "react";

import { useDataGetter, useGetter } from "../../reusable/hooks/useGetter";
import {
  deleteConfirmedUser,
  getConfirmedUsers,
} from "../../api/confirmedUsers";

export const GlobalContext = createContext();

export default function GlobalProvider({ children }) {
  //ConfirmedUser
  const updater1post = useDataGetter("b2fPostConfirmedUser");
  const updater2patch = useDataGetter("b2fPatchConfirmedUser");
  const updater3delete = useDataGetter("b2fDeleteConfirmedUser");
  useGetter(
    getConfirmedUsers,
    "f2bGetConfirmedUsers",
    null,
    updater1post,
    updater2patch,
    updater3delete,
  );
  const confirmedUsersGet = useDataGetter("b2fGetConfirmedUsers");
  //ConfirmedUser

  return (
    <GlobalContext.Provider value={{ confirmedUsersGet, deleteConfirmedUser }}>
      {children}
    </GlobalContext.Provider>
  );
}

GlobalProvider.propTypes = {
  children: PropTypes.any,
};
