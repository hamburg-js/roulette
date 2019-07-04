import { useState, useEffect } from "react";

/**
 * Hook that loads JSONP from a specified URL.
 */
export default function useJsonp(url: string | false, callback = "callback") {
  const [data, setData] = useState();
  useEffect(() => {
    setData(null);
    if (url) {
      const s = document.createElement("script");
      (window as any)[callback] = (data: any) => {
        setData(data);
        delete (window as any)[callback];
        if (s.parentNode) s.parentNode.removeChild(s);
      };
      s.src = url;
      document.body.appendChild(s);
    }
  }, [url, callback]);
  return data;
}
