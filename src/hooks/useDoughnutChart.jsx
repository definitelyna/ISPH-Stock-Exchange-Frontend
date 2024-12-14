import { useState, useEffect } from "react";
import { fetchApiData } from "../api/apiClient";
import useAuth from "../firebase/AuthService";
import { getAssetObject, getTransformedAssetDoughnutData } from "./utils";

const API_URL = import.meta.env.VITE_BACKEND_API;

export default function useDoughnutChart () {
  const [doughnutData, setDoughnutData] = useState(null);
  const [asset, setAsset] = useState({});
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();
  const userID = user?.uid;

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        setLoading(true);
        try {
          const data = await fetchApiData(
            API_URL,
            "GET",
            `/user/portfolio/${userID}`
          );

          const thisDoughnutData = getTransformedAssetDoughnutData(data);
          const newAssetData = getAssetObject(data);

          setDoughnutData(thisDoughnutData);
          setAsset(newAssetData);
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [user, API_URL, userID]);

  return { doughnutData, asset, loading };
};
