"use client";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  { name: "1", day: 400 },
  { name: "5", day: 200 },
  { name: "10", day: 230 },
  { name: "15", day: 200 },
  { name: "20", day: 200 },
  { name: "25", day: 200 },
  { name: "28", day: 250 },
];

const DashboardHomeGraph = () => {
  return (
    // <div
    //   style={{ width: "100%", height: 400 }}
    //   className="bg-white py-8 px-8 rounded-[10px]"
    // >
    //   <LineChart
    //     style={{ width: "100%", height: "100%" }}
    //     responsive
    //     className="bg-blue-200"
    //     data={data}
    //   >
    //     <CartesianGrid />
    //     <Line dataKey="day" />
    //     <XAxis dataKey="name" interval={0} />
    //     <YAxis />
    //     <Legend />
    //   </LineChart>
    // </div>

    <div className="h-100 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-lg font-semibold mb-4">Monthly sales</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid
            stroke="#e5e7eb"
            strokeDasharray="4 4"
            vertical={false}
          />
          <XAxis
            dataKey="name"
            interval={0}
            textAnchor="end"
            padding={{ left: 20, right: 20 }}
          />
          <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />
          <Tooltip
            labelFormatter={(label) => `Day ${label}`}
            formatter={(value) => [`$${value.toLocaleString()}`, "Sales"]}
            contentStyle={{
              borderRadius: "12px",
              border: "none",
              boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
            }}
          />
          <Line
            type="monotone"
            dataKey="day"
            stroke="#2563eb"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            isAnimationActive={true}
            animationDuration={800}
            animationEasing="ease-out"
          />
          <Legend />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardHomeGraph;
