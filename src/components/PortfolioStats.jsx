"use client";

import PortfolioRadarChart from "@/ui/PortfolioRadarChart";
import PortfolioReturnsLineGraph from "@/ui/PortfolioReturnsLineGraph";
import PortfolioTreemap from "@/ui/PortfolioTreemap";
import {
  tickersArrayAtoms,
  portfolioNameAtoms,
  portfolioLoadingAtoms,
  portfolioPieChartDataAtoms,
} from "@/jotai/PortfolioAtoms";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import TradingviewNews from "@/ui/TradingviewNews";
import FinlogixCurrency from "@/ui/FinlogixCurrency";

function PortfolioStats() {
  const [portfolioPieChartData, setPortfolioPieChartData] = useAtom(
    portfolioPieChartDataAtoms
  );
  const [tickersArray, setTickersArray] = useAtom(tickersArrayAtoms);
  const [portfolioChosen, setPortfolioChosen] = useAtom(portfolioNameAtoms);
  const [portfolioLoading, setPortfolioLoading] = useAtom(
    portfolioLoadingAtoms
  );

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setPortfolioLoading(true);
  //     try {
  //       const selectedPortfolio = portfolioPieChartData?.[portfolioChosen];
  //       if (selectedPortfolio && selectedPortfolio.tickers) {
  //         const formattedTickers = selectedPortfolio.tickers.map(
  //           ([symbol, value]) => ({
  //             name: symbol,
  //             value: Number(value), // Ensure it's a number for Recharts
  //           })
  //         );

  //         setTickersArray(formattedTickers);
  //         console.log("tickerarray je", tickersArray);
  //         console.log("Formatted Data:", formattedTickers);
  //       }

  //       const response = await fetch(
  //         "https://script.google.com/macros/s/AKfycbxRZwANhcRR69uJJVKuxHggU51oBwSu94pFmen9ZUUpvQQqbwZxsSOwnUskiqoixllsbQ/exec"
  //       );
  //       const result = await response.json();

  //       if (result.status === "success") {
  //         // 1. Get the specific portfolio based on the user's choice
  //         const selectedPortfolio = result.data?.[portfolioChosen];
  //         setPortfolioPieChartData(result.data);

  //         if (selectedPortfolio && selectedPortfolio.tickers) {
  //           // 2. Format the Array(2) ['AAPL', 100] into the Object { name: 'AAPL', value: 100 }
  //           const formattedTickers = selectedPortfolio.tickers.map(
  //             ([symbol, value]) => ({
  //               name: symbol,
  //               value: Number(value), // Ensure it's a number for Recharts
  //             })
  //           );

  //           setTickersArray(formattedTickers);
  //           console.log("Formatted Data:", formattedTickers);
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Fetch error:", error);
  //     } finally {
  //       setPortfolioLoading(false);
  //     }
  //   };
  //   if (portfolioPieChartData) {
  //     const selectedPortfolio = portfolioPieChartData?.[portfolioChosen];

  //     if (selectedPortfolio && selectedPortfolio.tickers) {
  //       const formattedTickers = selectedPortfolio.tickers.map(
  //         ([symbol, value]) => ({
  //           name: symbol,
  //           value: Number(value),
  //         })
  //       );

  //       setTickersArray(formattedTickers);
  //       console.log("Formatted Data:", formattedTickers);
  //     }
  //   } else {
  //     fetchData();
  //   }
  // }, [portfolioChosen]);

  return (
    <div className="flex flex-col h-fit w-[85%] items-center justify-center gap-4">
      <PortfolioReturnsLineGraph />
      <PortfolioRadarChart />
      {/* <PortfolioTreemap /> */}
      {/* <TradingviewNews />
      <FinlogixCurrency /> */}
    </div>
  );
}

export default PortfolioStats;
