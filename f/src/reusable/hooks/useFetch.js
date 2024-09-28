import { useEffect, useState } from "react";
import { fSocket, getter } from "../../api/api";

export function useFetch(
  rule,
  url,
  mess,
  fIO,
  id,
  updater1,
  updater2,
  updater3,
  updater4,
) {
  useEffect(() => {
    async function fetchData() {
      await getter(rule, url, mess, fIO, id);
    }
    fetchData();
    return () => {};
  }, [rule, url, mess, fIO, id, updater1, updater2, updater3, updater4]);
}

export function useGet(b2f) {
  const [apiData, apiDataSet] = useState();
  //last happening consuming data from BE
  {
    fSocket.on(b2f, (data) => {
      apiDataSet(data);
    });
    return apiData?.data;
  }
}
