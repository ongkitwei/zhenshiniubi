"use client";
import { Chart } from "react-google-charts";
import { portfolioLoadingAtoms } from "@/jotai/PortfolioAtoms";
import { useAtom } from "jotai";

const options = {
  is3D: true, // <--- The magic switch
  pieHole: 0.4, // Make it a donut (optional)
  backgroundColor: "transparent",
  legend: {
    position: "labeled",
    textStyle: { color: "gray", fontSize: 12 },
    alignment: "center",
  },
  pieSliceText: "percentage",
  pieSliceTextStyle: {
    color: "white",
    fontSize: 10,
  },
  slices: {
    0: { color: "#0088FE" },
    1: { color: "#00C49F" },
    2: { color: "#FFBB28" },
    3: { color: "#FF8042" },
  },

  chartArea: {
    left: "10%", // minimal margin left
    top: "10%", // minimal margin top
    right: 5, // minimal margin right
    bottom: 30, // leaves room for the legend at the bottom
    width: "70%",
    height: "80%",
  },
};

export default function PortfolioPiechart({ tickerArray }) {
  const [portfolioLoading, setPortfolioLoading] = useAtom(
    portfolioLoadingAtoms
  );
  const data = [["Platform", "Users"], ...tickerArray];
  console.log(tickerArray);
  return (
    <div className="w-auto h-auto">
      {/* {tickerArray.length > 0 ? ( */}
      {!portfolioLoading ? (
        <Chart
          chartType="PieChart"
          data={data}
          options={options}
          width={"100%"}
          height={"300px"}
        />
      ) : (
        <span className="loading loading-ring loading-md"></span>
      )}
    </div>
  );
}
