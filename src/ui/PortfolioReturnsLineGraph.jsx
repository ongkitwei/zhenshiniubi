"use client";

import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", portfolio: 4.2, sp500: 3.1 },
  { name: "Feb", portfolio: -1.5, sp500: 1.2 },
  { name: "Mar", portfolio: 5.8, sp500: 4.5 },
  { name: "Apr", portfolio: 12.4, sp500: 6.8 },
  { name: "May", portfolio: 15.1, sp500: 8.2 },
  { name: "Jun", portfolio: 18.5, sp500: 12.1 },
  { name: "Jul", portfolio: 22.0, sp500: 15.5 },
];

const PortfolioReturnsLineGraph = () => {
  // 1. STATE: Track visibility of each line
  const [visible, setVisible] = useState({
    portfolio: true,
    sp500: true,
  });

  // 2. HELPER: Toggle function
  const handleLegendClick = (key) => {
    setVisible((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // 3. COMPONENT: Custom Legend with Checkboxes
  const renderCustomLegend = () => {
    return (
      <div className="flex justify-center gap-6 mb-2">
        {/* Checkbox Item 1: S&P 500 */}
        <div
          className="flex items-center cursor-pointer select-none"
          onClick={() => handleLegendClick("sp500")}
        >
          <input
            type="checkbox"
            checked={visible.sp500}
            readOnly // React controls the state, so readOnly prevents warnings
            className="w-4 h-4 mr-2 rounded accent-[#8884d8] cursor-pointer"
          />
          <span className="text-sm font-bold text-[#8884d8]">S&P 500</span>
        </div>

        {/* Checkbox Item 2: My Returns */}
        <div
          className="flex items-center cursor-pointer select-none"
          onClick={() => handleLegendClick("portfolio")}
        >
          <input
            type="checkbox"
            checked={visible.portfolio}
            readOnly
            className="w-4 h-4 mr-2 rounded accent-[#f28c18] cursor-pointer"
          />
          <span className="text-sm font-bold text-[#f28c18]">My Returns</span>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-[400px] bg-white rounded-xl p-4 shadow-lg">
      <h3 className="text-lg font-bold mb-4 pl-2">YTD Return Comparison</h3>

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 50 }}
        >
          <defs>
            <linearGradient id="colorPortfolio" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f28c18" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#f28c18" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorSp500" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" opacity={0.2} vertical={false} />

          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9ca3af" }}
            interval={0}
          />

          <YAxis
            tickFormatter={(value) => `${value}%`}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9ca3af" }}
          />

          <Tooltip
            separator=" - "
            formatter={(value, name) => [`${value}%`, name]}
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "none",
              borderRadius: "8px",
            }}
            itemStyle={{ color: "#fff" }}
            labelStyle={{ color: "#9ca3af", marginBottom: "0.5rem" }}
          />

          {/* 4. Use 'content' prop to render our custom checkbox legend */}
          <Legend
            content={renderCustomLegend}
            verticalAlign="top"
            height={40}
          />

          {/* AREA 1: S&P 500 */}
          <Area
            type="monotone"
            dataKey="sp500"
            name="snp500"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorSp500)"
            hide={!visible.sp500} // <--- Hides line if visible.sp500 is false
          />

          {/* AREA 2: My Portfolio */}
          <Area
            type="monotone"
            dataKey="portfolio"
            name="Your returns"
            stroke="#f28c18"
            fillOpacity={1}
            fill="url(#colorPortfolio)"
            hide={!visible.portfolio} // <--- Hides line if visible.portfolio is false
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PortfolioReturnsLineGraph;
