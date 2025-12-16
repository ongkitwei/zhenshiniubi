"use client";

import React from "react";
import { Treemap, ResponsiveContainer, Tooltip } from "recharts";

// 1. DATA: "size" determines box size, "performance" determines color
const data = [
  {
    name: "Technology",
    children: [
      { name: "AAPL", size: 12500, performance: 4.5 }, // Big Gain
      { name: "MSFT", size: 10000, performance: 2.1 }, // Small Gain
      { name: "NVDA", size: 8000, performance: -1.2 }, // Loss
      { name: "GOOGL", size: 6000, performance: 0.5 },
    ],
  },
  {
    name: "Finance",
    children: [
      { name: "JPM", size: 5000, performance: -3.4 }, // Big Loss
      { name: "V", size: 3000, performance: 1.1 },
      { name: "MA", size: 2500, performance: 0.2 },
    ],
  },
  {
    name: "Consumer",
    children: [
      { name: "AMZN", size: 7000, performance: 2.8 },
      { name: "TSLA", size: 4500, performance: -5.6 },
    ],
  },
];

// 2. COLORS: Define your Red/Green palette
const COLORS = {
  positive: "#10b981", // Emerald 500
  negative: "#ef4444", // Red 500
  neutral: "#6b7280", // Gray 500
};

// 3. CUSTOM CONTENT: This renders the colored box and text
const CustomizedContent = (props) => {
  // Destructure the props passed by Recharts automatically
  const { x, y, width, height, name, performance } = props;

  // Choose color based on performance value
  let fillColor = COLORS.neutral;
  if (performance > 0) fillColor = COLORS.positive;
  if (performance < 0) fillColor = COLORS.negative;

  return (
    <g>
      {/* The Colored Rectangle */}
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: fillColor,
          stroke: "#fff",
          strokeWidth: 2, // Creates the white gap between boxes
          strokeOpacity: 1,
        }}
      />
      {/* Text: Ticker Symbol (Only show if box is big enough) */}
      {width > 30 && height > 30 && (
        <text
          x={x + width / 2}
          y={y + height / 2 - 6}
          textAnchor="middle"
          fill="#fff"
          fontSize={14}
          fontWeight="bold"
          style={{ pointerEvents: "none" }} // Prevents text from blocking hover
        >
          {name}
        </text>
      )}
      {/* Text: Performance % (Only show if box is big enough) */}
      {width > 30 && height > 30 && (
        <text
          x={x + width / 2}
          y={y + height / 2 + 10}
          textAnchor="middle"
          fill="#fff"
          fontSize={11}
          style={{ pointerEvents: "none" }}
        >
          {performance > 0 ? "+" : ""}
          {performance}%
        </text>
      )}
    </g>
  );
};

// 4. CUSTOM TOOLTIP
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const itemData = payload[0].payload; // Access the object data
    return (
      <div className="bg-gray-800 text-white p-2 rounded shadow-lg border-none">
        <p className="font-bold">{itemData.name}</p>
        <p className="text-sm">Value: ${itemData.size.toLocaleString()}</p>
        <p
          className={`text-sm ${
            itemData.performance >= 0 ? "text-green-400" : "text-red-400"
          }`}
        >
          Return: {itemData.performance}%
        </p>
      </div>
    );
  }
  return null;
};

const PortfolioTreemap = () => {
  return (
    <div className="w-full h-[400px] p-4 pt-8 rounded-xl flex flex-col bg-white border border-gray-100 shadow-sm">
      <h3 className="text-lg font-bold mb-4 pl-2 text-black">
        Holdings Heatmap
      </h3>

      <div className="flex-1 min-h-0 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <Treemap
            data={data}
            dataKey="size"
            aspectRatio={4 / 3}
            stroke="#fff"
            fill="#8884d8"
            // Use our custom renderer
            content={<CustomizedContent />}
          >
            <Tooltip content={<CustomTooltip />} />
          </Treemap>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PortfolioTreemap;
