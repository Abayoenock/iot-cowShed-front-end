import React, { useContext, useEffect, useState } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Line } from "react-chartjs-2"
import { AuthContext } from "../../AdminDashbard/Dashboard"
import useFetch from "../../useFetch"
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export const options = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      color: "white",
      labels: {
        color: "white", // Change dataset label text color
      },
    },
    title: {
      display: true,
      text: "Feeding statistics",
      color: "white",
    },
  },
  scales: {
    y: {
      beginAtZero: true, // Set the minimum value on the y-axis to 0
      title: {
        display: true,
        text: "water in Ltrs and food in kgs", // Label for the y-axis
        color: "white",
      },
      grid: {
        color: "rgba(255, 255, 255, 0.5)", // Change Y-axis grid color
      },
      ticks: {
        color: "white", // Change Y-axis label text color
      },
    },
    x: {
      title: {
        display: true,
        text: "Days", // Label for the x-axis
        color: "white",
      },
      grid: {
        color: "rgba(255, 255, 255, 0.5)", // Change x-axis grid color
      },
      ticks: {
        color: "white", // Change x-axis label text color
      },
    },
  },
}

export function LineChartAdmin({ year, month, reFetch = true }) {
  const [attandanceData, setAttandanceData] = useState([])
  const { token } = useContext(AuthContext)
  const url = `${
    import.meta.env.VITE_REACT_API_URL
  }/api/requestData.php?t=adminGraph&year=${year}&month=${month}`
  const { isLoading, isError, data, fetchData } = useFetch(url)

  useEffect(() => {
    fetchData(token, setAttandanceData)
    if (reFetch) {
      const intID = setInterval(() => {
        fetchData(token, setAttandanceData)
      }, 2000)
      return () => {
        clearInterval(intID)
      }
    }
  }, [year, month])

  const labels = attandanceData.map((data) => data.label)
  const dataChart = {
    labels,
    datasets: [
      {
        label: "Food (Kgs)",
        data: attandanceData.map((data) => data.food),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.2,
        pointRadius: 0,
      },
      {
        label: "Water (Ltrs)",
        data: attandanceData.map((data) => data.water),
        borderColor: "rgb(20, 30, 255)",
        backgroundColor: "rgba(20, 30, 255, 0.5)",
        tension: 0.2,
        pointRadius: 0,
      },
    ],
  }

  return (
    <>
      <Line options={options} data={dataChart} />
    </>
  )
}
