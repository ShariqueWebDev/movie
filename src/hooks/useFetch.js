import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../utils/api";
import LoaderSpinner from "../components/loaderSpinner/LoaderSpinner";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(LoaderSpinner)
    setError(null);
    setData(null);

    fetchDataFromApi(url).then((res) => {
        setIsLoading(false);
        setData(res);
      }).catch((error) => {
        setIsLoading(false);
        setError("error occured:" + error);
      });
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;