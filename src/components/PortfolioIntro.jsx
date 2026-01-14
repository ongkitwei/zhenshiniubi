"use client";

import PortfolioPiechart from "@/ui/PortfolioPiechart";
import React, { useEffect } from "react";
import { useAtom } from "jotai";
import {
  portfolioNameAtoms,
  portfolioPieChartDataAtoms,
  tickersArrayAtoms,
  portfolioLoadingAtoms,
} from "@/jotai/PortfolioAtoms";
import Image from "next/image";

function PortfolioIntro() {
  const [portfolioPieChartData, setPortfolioPieChartData] = useAtom(
    portfolioPieChartDataAtoms
  );
  const [tickersArray, setTickersArray] = useAtom(tickersArrayAtoms);
  const [portfolioChosen, setPortfolioChosen] = useAtom(portfolioNameAtoms);
  const [portfolioLoading, setPortfolioLoading] = useAtom(
    portfolioLoadingAtoms
  );

  const topHolding =
    tickersArray?.length > 0 ? (
      tickersArray.reduce((prev, curr) =>
        curr.value > prev.value ? curr : prev
      ).name
    ) : (
      <span className="loading loading-spinner loading-md"></span>
    );
  const leastHolding =
    tickersArray?.length > 0 ? (
      tickersArray.reduce((prev, curr) =>
        curr.value < prev.value ? curr : prev
      ).name
    ) : (
      <span className="loading loading-spinner loading-md"></span>
    );

  useEffect(() => {
    const fetchData = async () => {
      setPortfolioLoading(true);
      try {
        const selectedPortfolio = portfolioPieChartData?.[portfolioChosen];
        if (selectedPortfolio && selectedPortfolio.tickers) {
          const formattedTickers = selectedPortfolio.tickers.map(
            ([symbol, value]) => ({
              name: symbol,
              value: Number(value), // Ensure it's a number for Recharts
            })
          );

          setTickersArray(formattedTickers);
          console.log("tickerarray je", tickersArray);
          console.log("Formatted Data:", formattedTickers);
        }

        const response = await fetch(process.env.NEXT_PUBLIC_APP_SCRIPT_LINK);
        const result = await response.json();

        if (result.status === "success") {
          // 1. Get the specific portfolio based on the user's choice
          const selectedPortfolio = result.data?.[portfolioChosen];
          setPortfolioPieChartData(result.data);

          if (selectedPortfolio && selectedPortfolio.tickers) {
            // 2. Format the Array(2) ['AAPL', 100] into the Object { name: 'AAPL', value: 100 }
            const formattedTickers = selectedPortfolio.tickers.map(
              ([symbol, value]) => ({
                name: symbol,
                value: Number(value), // Ensure it's a number for Recharts
              })
            );

            setTickersArray(formattedTickers);
            console.log("Formatted Data:", formattedTickers);
          }
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setPortfolioLoading(false);
      }
    };
    if (portfolioPieChartData) {
      const selectedPortfolio = portfolioPieChartData?.[portfolioChosen];

      if (selectedPortfolio && selectedPortfolio.tickers) {
        const formattedTickers = selectedPortfolio.tickers.map(
          ([symbol, value]) => ({
            name: symbol,
            value: Number(value),
          })
        );

        setTickersArray(formattedTickers);
        console.log("Formatted Data:", formattedTickers);
      }
    } else {
      fetchData();
    }
  }, [portfolioChosen]);

  return (
    <div className="flex flex-col h-fit w-[85%] items-start justify-center bg-white rounded-xl pt-12">
      <div className="flex flex-col justify-center items-start w-full">
        <header className="font-poppins text-2xl font-semibold pb-4">
          {portfolioChosen}
        </header>
        <div className="grid grid-cols-3 gap-2 w-full">
          <div className="w-60 h-25 shadow-lg bg-white flex flex-col items-start justify-center rounded-xl p-5 gap-y-1">
            <div className="flex flex-row items-center justify-start">
              <Image
                src="/layer-icon.svg"
                alt="layer icon"
                width={25}
                height={25}
              />
              <p className="font-poppins text-md font-medium">No of Stocks</p>
            </div>
            <p className="pl-1 font-poppins font-semibold text-2xl">
              {tickersArray.length}
            </p>
          </div>

          <div className="w-60 h-25 shadow-lg bg-white flex flex-col items-start justify-center rounded-xl p-5 gap-y-1">
            <div className="flex flex-row items-center justify-start">
              <Image
                src="/crown-icon.svg"
                alt="crown holding icon"
                width={25}
                height={25}
              />
              <p className="font-poppins text-md font-medium">Top Holding</p>
            </div>
            <p className="pl-1 font-poppins font-semibold text-2xl">
              {topHolding}
            </p>
          </div>

          <div className="w-60 h-25 shadow-lg bg-white flex flex-col items-start justify-center rounded-xl p-5 gap-y-1">
            <div className="flex flex-row items-center justify-start">
              <Image
                src="/microscope-icon.svg"
                alt="microscope icon"
                width={25}
                height={25}
              />
              <p className="font-poppins text-md font-medium">
                Smallest Holding
              </p>
            </div>
            <p className="pl-1 font-poppins font-semibold text-2xl">
              {leastHolding}
            </p>
          </div>
        </div>
      </div>
      <PortfolioPiechart tickerArray={tickersArray} />
    </div>
  );
}

export default PortfolioIntro;
