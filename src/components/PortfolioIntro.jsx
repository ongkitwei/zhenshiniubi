"use client";

import PortfolioPiechart from "@/ui/PortfolioPiechart";
import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import {
  portfolioNameAtoms,
  portfolioPieChartDataAtoms,
  tickersArrayAtoms,
  portfolioLoadingAtoms,
} from "@/jotai/PortfolioAtoms";
import Image from "next/image";
import { PORTFOLIOS } from "../../constant";

function PortfolioIntro() {
  const [portfolioPieChartSector, setPortfolioPieChartSector] = useState([]);
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
              value: Number(value),
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
          console.log("jus fetch result", result.data);
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
            setPortfolioPieChartSector(
              Object.values(selectedPortfolio?.["sector"] || {})
            );
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
        setPortfolioPieChartSector(
          Object.values(selectedPortfolio?.["sector"] || {})
        );
        console.log("Formatted Data:", formattedTickers);
      }
    } else {
      fetchData();
    }
  }, [portfolioChosen]);

  return (
    <div className="flex flex-col h-fit w-[85%] items-start justify-center rounded-xl pt-12">
      <div className="flex flex-col justify-center items-start w-full">
        {/* start of header ui */}
        <div className="mb-8 overflow-x-auto pb-4 scrollbar-hide">
          <div className="inline-flex p-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm whitespace-nowrap">
            {PORTFOLIOS.map((p) => (
              <button
                key={p}
                onClick={() => setPortfolioChosen(p)}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 flex items-center space-x-2 hover:cursor-pointer ${
                  portfolioChosen === p
                    ? "bg-indigo-600 text-white shadow-xl shadow-indigo-500/30 scale-[1.02]"
                    : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                }`}
              >
                <span>{p}</span>
                {portfolioChosen === p && (
                  <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse" />
                )}
              </button>
            ))}
          </div>
        </div>
        {/* end of header ui */}

        <div className="flex flex-row gap-2 w-full justify-between">
          <div className="card-metric-style md:w-55 lg:w-60 xl:w-70 h-30 gap-y-1">
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

          <div className="card-metric-style md:w-55 lg:w-60 xl:w-70 h-30 gap-y-1">
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

          <div className="card-metric-style md:w-55 lg:w-60 xl:w-70 h-30 gap-y-1">
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
      <PortfolioPiechart
        tickerArray={tickersArray}
        innerRadius={70}
        outerRadius={150}
        paddingAngle={5}
      />
      <PortfolioPiechart
        tickerArray={portfolioPieChartSector}
        innerRadius={70}
        outerRadius={160}
        paddingAngle={5}
      />
    </div>
  );
}

export default PortfolioIntro;
