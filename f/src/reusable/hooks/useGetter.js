import { useEffect } from "react";

export function useGetter(getData) {
  return useEffect(() => {
    async function fetchData() {
      const response = await getData();
      return response;
    }
    fetchData();
    //cleaning
    return () => {};
  }, [getData]);
}
