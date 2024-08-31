import { useEffect, useState } from "react";
import { fSocket } from "../../api/apis/api";

export function useGetter(getData) {
  useEffect(() => {
    async function fetchData() {
      await getData();
    }
    fetchData();
    //cleaning
    return () => {};
  }, [getData]);
}

export function useDataGetter(bIO) {
  const [apiData, apiDataSet] = useState();

  //last happening updating all data in FE
  fSocket.on(bIO, (data) => {
    apiDataSet(data);
  });
  return apiData?.data;
}
