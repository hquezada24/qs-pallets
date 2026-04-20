"use client";
import Table, { Column } from "./Table";

const orderColumns = [
  { key: "orderNumber", header: "Orden #" },
  { key: "name", header: "Cliente" },
  {
    key: "total",
    header: "Total",
    render: (value: number) => `$${value.toFixed(2)}`,
  },
] satisfies Column<Sales>[];

interface Sales {
  orderNumber: string;
  name: string;
  companyName: string;
  total: number;
}

interface SalesSummaryCardProps {
  sales: Sales[];
  lastMonthSales: number;
  currentMonthTotal: number;
}

const SalesSummaryCard = ({
  sales,
  currentMonthTotal,
  lastMonthSales = 0,
}: SalesSummaryCardProps) => {
  const percentageChange =
    lastMonthSales === 0
      ? null
      : ((currentMonthTotal - lastMonthSales) / lastMonthSales) * 100;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-4">
      {sales.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-400 gap-2">
          <span className="text-4xl">📭</span>
          <p className="text-sm font-medium">No sales this month</p>
        </div>
      ) : (
        <Table
          title={"Sales This Month"}
          columns={orderColumns}
          data={sales}
          keyField="orderNumber"
        />
      )}

      {/* Footer stats */}
      <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
        <p className="text-base font-semibold text-gray-800">
          ${currentMonthTotal.toLocaleString()}
          <span className="block text-xs font-normal text-gray-400">
            Month total
          </span>
        </p>
        {percentageChange === null ? (
          <span className="text-xs text-gray-400">No data from last month</span>
        ) : (
          <span
            className={`inline-flex items-center gap-1 text-sm font-semibold px-3 py-1 rounded-full ${
              percentageChange > 0
                ? "bg-green-50 text-green-600"
                : "bg-red-50 text-red-600"
            }`}
          >
            {percentageChange >= 0 ? "+" : "-"}
            {Math.abs(percentageChange).toFixed(0)}% vs last month
          </span>
        )}
      </div>
    </div>
  );
};

export default SalesSummaryCard;
