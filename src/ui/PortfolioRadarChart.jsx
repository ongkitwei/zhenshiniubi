"use client";

import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

// Example Data: Comparing your portfolio's sector allocation vs. a benchmark
const data = [
  { subject: "Tech", portfolio: 120, benchmark: 110, fullMark: 150 },
  { subject: "Finance", portfolio: 98, benchmark: 130, fullMark: 150 },
  { subject: "Energy", portfolio: 86, benchmark: 130, fullMark: 150 },
  { subject: "Health", portfolio: 99, benchmark: 100, fullMark: 150 },
  { subject: "Consumer", portfolio: 85, benchmark: 90, fullMark: 150 },
  { subject: "Real Estate", portfolio: 65, benchmark: 85, fullMark: 150 },
];

const PortfolioRadarChart = () => {
  return (
    <div className="w-full h-[400px] p-4 pt-8 rounded-xl flex flex-col  bg-white shadow-lg">
      <h3 className="text-lg font-bold mb-4 pl-2 text-black">
        Sector Allocation
      </h3>

      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          {/* 1. The Web Grid */}
          <PolarGrid stroke="#9ca3af" strokeDasharray="3 3" />

          {/* 2. The Labels (Tech, Finance, etc.) */}
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: "#9ca3af", fontSize: 12, fontWeight: "bold" }}
          />

          {/* 3. The Axis Scale (0, 50, 100...) - Optional */}
          <PolarRadiusAxis
            angle={30}
            domain={[0, 150]}
            tick={{ fill: "#9ca3af", fontSize: 10 }}
            axisLine={false} // Hides the straight line, keeps the text
          />

          {/* 4. Comparison Radar (Benchmark) - Rendered behind */}
          <Radar
            name="Benchmark"
            dataKey="benchmark"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.3}
          />

          {/* 5. Your Portfolio Radar - Rendered in front */}
          <Radar
            name="My Portfolio"
            dataKey="portfolio"
            stroke="#f28c18"
            fill="#f28c18"
            fillOpacity={0.5}
          />

          <Legend wrapperStyle={{ paddingTop: "30px" }} />

          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PortfolioRadarChart;
