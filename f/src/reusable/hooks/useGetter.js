import { useEffect, useState } from "react";
import { fSocket } from "../../api/apis/api";

export function useGetter(getData, fIO, id) {
  useEffect(() => {
    async function fetchData() {
      await getData(fIO, id);
    }
    fetchData();
    return () => {};
  }, [getData, fIO, id]);
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
