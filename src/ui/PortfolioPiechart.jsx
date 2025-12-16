// "use client";

// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// const data = [
//   { name: "Instagram", value: 400 },
//   { name: "Twitter", value: 300 },
//   { name: "Facebook", value: 300 },
//   { name: "TikTok", value: 200 },
// ];

// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// export default function PortfolioPiechart() {
//   return (
//     // ResponsiveContainer makes the chart adapt to the parent div's size
//     <div style={{ width: "100%", height: 300 }}>
//       <ResponsiveContainer>
//         <PieChart>
//           <Pie
//             data={data}
//             cx="50%"
//             cy="50%"
//             innerRadius={60} // Remove this line if you want a full pie, keep it for "Donut"
//             outerRadius={80}
//             fill="#8884d8"
//             paddingAngle={1}
//             dataKey="value"
//           >
//             {data.map((entry, index) => (
//               <Cell
//                 key={`cell-${index}`}
//                 fill={COLORS[index % COLORS.length]}
//               />
//             ))}
//           </Pie>
//           <Tooltip />
//           <Legend />
//         </PieChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }
"use client";
import { Chart } from "react-google-charts";

const data = [
  ["Platform", "Users"],
  ["Instagram", 400],
  ["Twitter", 300],
  ["Facebook", 300],
  ["TikTok", 200],
];

const options = {
  is3D: true, // <--- The magic switch
  pieHole: 0.4, // Make it a donut (optional)
  backgroundColor: "transparent",
  legend: { position: "bottom", textStyle: { color: "gray" } },
  slices: {
    0: { color: "#0088FE" },
    1: { color: "#00C49F" },
    2: { color: "#FFBB28" },
    3: { color: "#FF8042" },
  },

  chartArea: {
    left: 5, // minimal margin left
    top: 5, // minimal margin top
    right: 5, // minimal margin right
    bottom: 50, // leaves room for the legend at the bottom
    width: "100%",
    height: "100%",
  },
};

export default function PortfolioPiechart() {
  return (
    <div className="w-auto h-auto">
      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width={"100%"}
        height={"300px"}
      />
    </div>
  );
}
