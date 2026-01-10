import PortfolioPiechart from "@/ui/PortfolioPiechart";
import { tickersArrayAtoms } from "@/jotai/PortfolioAtoms";
import React from "react";
import { useAtom } from "jotai";

function PortfolioIntro() {
  const [tickersArray, setTickersArray] = useAtom(tickersArrayAtoms);

  return (
    <div className="flex flex-row h-fit w-[85%] items-center justify-center bg-white rounded-xl p-4">
      <PortfolioPiechart tickerArray={tickersArray} />
    </div>
  );
}

export default PortfolioIntro;
