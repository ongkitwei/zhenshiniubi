import PortfolioPiechart from "@/ui/PortfolioPiechart";
import React from "react";

function PortfolioIntro() {
  return (
    <div className="flex flex-row h-fit w-[85%] items-center justify-center bg-white rounded-xl p-4">
      <PortfolioPiechart />
    </div>
  );
}

export default PortfolioIntro;
