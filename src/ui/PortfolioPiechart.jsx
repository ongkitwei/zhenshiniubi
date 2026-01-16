"use client";
import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { useAtom } from "jotai";
import { portfolioLoadingAtoms } from "@/jotai/PortfolioAtoms";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042", // Your originals
  "#8884d8",
  "#82ca9d", // Your originals
  "#ff6666",
  "#00ced1",
  "#ffa500",
  "#9370db", // New vibrant tones
  "#3cb371",
  "#f08080",
  "#4682b4",
  "#d2b48c",
  "#da70d6", // New distinct tones
];

export default function PortfolioPiechart({ tickerArray }) {
  const [portfolioLoading] = useAtom(portfolioLoadingAtoms);
  const [isMounted, setIsMounted] = useState(false);

  // 1. Prevent Hydration Mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || portfolioLoading) {
    return (
      <div className="flex justify-center items-center h-[300px] w-full">
        <span className="loading loading-ring loading-xl text-center"></span>
      </div>
    );
  }

  // 2. Safety Check: If tickerArray is empty, don't render the chart
  if (!tickerArray || tickerArray.length === 0) {
    return (
      <div className="flex justify-center items-center h-[300px] text-gray-400">
        No holdings found for this portfolio.
      </div>
    );
  }

  return (
    <div className="w-full h-140 card-metric-style mt-6">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart margin={{ bottom: 40 }}>
          <Pie
            data={tickerArray}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={150}
            paddingAngle={5}
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >
            {tickerArray.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
          <Legend
            verticalAlign="bottom"
            align="center"
            iconType="circle"
            wrapperStyle={{
              width: "100%", // Ensures it spans the whole chart width
              fontSize: "12px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
