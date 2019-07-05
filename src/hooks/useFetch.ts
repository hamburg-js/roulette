import { useState, useEffect } from "react";

/**
 * Hook that fetches JSON from a specified URL.
 */
export default function useFetch(url: string | false) {
  const [data, setData] = useState();
  useEffect(() => {
    setData(null);
    if (url)
      fetch(url)
        .then(res => res.json())
        .then(setData);
  }, [url]);
  return data;
}
