import { useEffect, useState } from "react";

let storageFlag = localStorage.getItem("findCountries");
export default function useLocalStorage(): [
  number,
  (updater: (prev: number) => number) => void
] {
  const [data, setData] = useState(storageFlag ? parseInt(storageFlag) : 1);

  useEffect(() => {
    const data = localStorage.getItem("findCountries");

    if (!data) localStorage.setItem("findCountries", "1");
  }, []);

  useEffect(() => {
    const local = localStorage.getItem("findCountries");

    if (local && data >= parseInt(local)) {
      localStorage.setItem("findCountries", String(data));
    }
  }, [data]);

  return [data, setData];
}
