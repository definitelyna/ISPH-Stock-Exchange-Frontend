import { useEffect, useState } from "react";
import Overlay from "../../components/Overlay/Overlay";
import { fetchApiData } from "../../api/apiClient";
import useAuth from "../../firebase/AuthService";
import { Doughnut } from "react-chartjs-2";
import { Box } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const apiUrl = import.meta.env.VITE_BACKEND_API;

export default function Portfolio() {
  const [doughtnutData, setDoughnutData] = useState({
    labels: [],
    datasets: [
      {
        label: "Value",
        data: [],
        backgroundColor: [],
      },
    ],
  });

  const { user } = useAuth();
  const userID = user?.uid;

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const data = await fetchApiData(
          apiUrl,
          "GET",
          `/user/portfolio/${userID}`
        );

        const thisDoughnutData = transformedDoughnutData(data)
        setDoughnutData(thisDoughnutData)
      }
    };

    fetchData();
  }, []);

  const transformedDoughnutData = (apiData) => {
    let data = {
      labels: [],
      datasets: [
        {
          label: "Value",
          data: [],
          backgroundColor: [],
        },
      ],
    };
    const stockPossession = apiData.items;
    Object.keys(stockPossession).forEach((stock) => {
      const stockValue = stockPossession[stock].quantity //Currently quantity, needs multiply price to be value when quang adds price

      data.labels.push(stock)
      data.datasets[0].data.push(stockValue)
    });

    return data
  };

  return (
    <Overlay>
      <Box sx={{ width: 300, height: 300 }}>
        <Doughnut
          data={doughtnutData}
        />
      </Box>
    </Overlay>
  );
}
