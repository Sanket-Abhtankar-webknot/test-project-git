import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { baseURL } from "../utils/utils";

interface UseAPiData {
  endPoint?: string;
  name?: string;
  region?: string;
}

export default function useAPIData({
  endPoint,
  name,
  region,
}: UseAPiData): any[] {
  const [data, setData] = useState<object[]>();
  const [loading, setLoading] = useState(false);
  const getCountryDataAPI = async () => {
    setLoading(true);
    const defaultCall = "all";
    console.log(name, region)
    const construct = `${baseURL}${
      name
        ? `name/${name}`
        : region
        ? `region/${region}`
        : endPoint || defaultCall
    }`;

    try {
      const response = await axios.get(construct);

      if (response.statusText === "OK") {
        setData(response.data);
        setLoading(false);
      } else {
        setData([]);
      }
    } catch (error) {
      //error
      setData([]);
    }
  };
  useEffect(() => {
    if(!name && !region) getCountryDataAPI();
  }, []);

  useEffect(() => {
    if (name || region) {
      getCountryDataAPI();
    }
  }, [name, region]);

  const memoData = useMemo(() => {
    if (!data?.length) return null;
    return data;
  }, [data]);

  return [memoData, loading];
}
