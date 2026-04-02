"use client";
import Table from "./Table";

const orderColumns = [
  { key: "orderNumber", header: "Orden #" },
  { key: "name", header: "Cliente" },
  { key: "companyName", header: "Company" },
  {
    key: "total",
    header: "Total",
    render: (value: number) => `$${value.toLocaleString()}`,
  },
];

interface Sales {
  orderNumber: string;
  name: string;
  companyName: string;
  total: number;
}

interface SalesSummaryCardProps {
  sales: Sales[];
  lastMonthSales: number;
}

const SalesSummaryCard = ({
  sales,
  lastMonthSales = 0,
}: SalesSummaryCardProps) => {
  const currentMonthTotal = sales.reduce((acc, item) => acc + item.total, 0);

  const percentageChange =
    ((currentMonthTotal - lastMonthSales) / lastMonthSales) * 100;
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-4">
      <Table
        title={"Sales This Month"}
        columns={orderColumns}
        data={sales}
        keyField="id"
      />

      {/* Footer stats */}
      <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
        <p className="text-base font-semibold text-gray-800">
          ${currentMonthTotal.toLocaleString()}
          <span className="block text-xs font-normal text-gray-400">
            Month total
          </span>
        </p>
        <span
          className={`inline-flex items-center gap-1 text-sm font-semibold px-3 py-1 rounded-full ${
            percentageChange > 0
              ? "bg-green-50 text-green-600"
              : "bg-red-50 text-red-600"
          }`}
        >
          {percentageChange >= 0 ? "▲" : "▼"}
          {Math.abs(percentageChange).toFixed(0)}% vs last month
        </span>
      </div>
    </div>
  );
};

export default SalesSummaryCard;
