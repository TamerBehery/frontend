import { useEffect, useState } from "react";
import fetchApi from "@/hooks/fetchApi";

const useFetch = (endPoint) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetchApi.get(endPoint);
        res && setData(res);
        //console.log(res.data.data)
      } catch (error) {
        setError(true);
      }
      setLoading(false);
    };

    fetchData();
  }, [endPoint]);

  //data && console.log(data);

  return { data, loading, error };
};

export default useFetch;
