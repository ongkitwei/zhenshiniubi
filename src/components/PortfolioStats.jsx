"use client";

import PortfolioRadarChart from "@/ui/PortfolioRadarChart";
import PortfolioReturnsLineGraph from "@/ui/PortfolioReturnsLineGraph";
import PortfolioTreemap from "@/ui/PortfolioTreemap";
import {
  tickersArrayAtoms,
  portfolioNameAtoms,
  portfolioLoadingAtoms,
} from "@/jotai/PortfolioAtoms";
import { useAtom } from "jotai";
import React, { useEffect } from "react";

function PortfolioStats() {
  const [tickersArray, setTickersArray] = useAtom(tickersArrayAtoms);
  const [portfolioChosen, setPortfolioChosen] = useAtom(portfolioNameAtoms);
  const [portfolioLoading, setPortfolioLoading] = useAtom(
    portfolioLoadingAtoms
  );

  useEffect(() => {
    const fetchData = async () => {
      setPortfolioLoading(true);
      try {
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbxRZwANhcRR69uJJVKuxHggU51oBwSu94pFmen9ZUUpvQQqbwZxsSOwnUskiqoixllsbQ/exec"
        );
        const result = await response.json();

        if (result.status === "success") {
          console.log("Portfolio Data:", result.data);
          // e.g., result.data["Moomoo Portfolio"].marketValue
          setTickersArray(result.data?.[portfolioChosen].tickers);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setPortfolioLoading(false);
      }
    };
    fetchData();
  }, [portfolioChosen]);
  return (
    <div className="flex flex-col h-fit w-[85%] items-center justify-center gap-4">
      <PortfolioReturnsLineGraph />
      <PortfolioRadarChart />
      <PortfolioTreemap />
    </div>
  );
}

export default PortfolioStats;
