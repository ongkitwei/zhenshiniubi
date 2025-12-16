import PortfolioRadarChart from "@/ui/PortfolioRadarChart";
import PortfolioReturnsLineGraph from "@/ui/PortfolioReturnsLineGraph";
import PortfolioTreemap from "@/ui/PortfolioTreemap";
import React from "react";

function PortfolioStats() {
  return (
    <div className="flex flex-col h-fit w-[85%] items-center justify-center gap-4">
      <PortfolioReturnsLineGraph />
      <PortfolioRadarChart />
      <PortfolioTreemap />
    </div>
  );
}

export default PortfolioStats;
