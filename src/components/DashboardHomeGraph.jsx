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

const TARGET_POINTS = 7;

const buildMonthlySalesGraphData = (sales) => {
  const today = new Date();
  const currentDayOfMonth = today.getDate();
  const totalPoints = Math.min(TARGET_POINTS, currentDayOfMonth);
  const startDay = currentDayOfMonth - totalPoints + 1;

  const salesByDay = sales.reduce((accumulator, order) => {
    const deliveredDate = new Date(order.deliveredAt);
    const dayOfMonth = deliveredDate.getDate();
    const currentTotal = accumulator.get(dayOfMonth) || 0;

    accumulator.set(dayOfMonth, currentTotal + Number(order.total || 0));

    return accumulator;
  }, new Map());

  return Array.from(
    { length: totalPoints },
    (_, index) => startDay + index,
  ).map((dayOfMonth) => ({
    name: dayOfMonth.toString(),
    day: Math.round(salesByDay.get(dayOfMonth) || 0),
  }));
};

const DashboardHomeGraph = ({ sales }) => {
  const data = buildMonthlySalesGraphData(sales);

  return (
    <div className="h-100 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-lg font-semibold mb-4">Weekly sales</h2>
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
