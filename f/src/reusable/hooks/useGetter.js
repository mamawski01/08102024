import { useEffect, useState } from "react";
import { fSocket } from "../../api/apis/api";

export function useGetter(getData, fIO, id, updater1, updater2, updater3) {
  useEffect(() => {
    async function fetchData() {
      await getData(fIO, id);
    }
    fetchData();
    return () => {};
  }, [getData, fIO, id, updater1, updater2, updater3]);
}

export function useDataGetter(bIO) {
  const [apiData, apiDataSet] = useState();
  //last happening consuming data from BE
  {
    fSocket.on(bIO, (data) => {
      apiDataSet(data);
    });
    return apiData?.data;
  }
}
