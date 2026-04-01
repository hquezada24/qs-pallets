import DashboardNav from "@/components/DashboardNav";
import DashboardHomeGraph from "@/components/DashboardHomeGraph";
import Table from "@/components/Table";

const orderColumns = [
  { key: "id", header: "Orden #" },
  { key: "customer", header: "Cliente" },
  {
    key: "total",
    header: "Total",
    render: (value) => `$${value.toLocaleString()}`,
  },
  {
    key: "status",
    header: "Estado",
    render: (value) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === "Pagado"
            ? "bg-green-100 text-green-700"
            : "bg-yellow-100 text-yellow-700"
        }`}
      >
        {value}
      </span>
    ),
  },
];

const orderData = [
  { id: 101, customer: "Juan Pérez", total: 1500, status: "Pagado" },
  { id: 102, customer: "Empresa XYZ", total: 2300, status: "Pendiente" },
];

const DashboardHome = () => {
  const currentMonthTotal = orderData.reduce(
    (acc, item) => acc + item.total,
    0,
  );

  const lastMonthTotal = 5200; // ejemplo real vendría del backend

  const percentageChange =
    ((currentMonthTotal - lastMonthTotal) / lastMonthTotal) * 100;
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      {/* Nav Pills */}
      <div className="flex justify-center gap-3 mb-8 flex-wrap">
        <DashboardNav bg={"blue"} text={"Orders"} link={"/orders"} />
        <DashboardNav bg={"red"} text={"Quotes"} link={"/quotes"} />
        <DashboardNav bg={"green"} text={"Inventory"} link={"/our-products"} />
        <DashboardNav bg={"yellow"} text={"Customers"} link={"/customers"} />
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        {/* Chart Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <DashboardHomeGraph />
        </div>

        {/* Sales Summary Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-4">
          <Table
            title={"Sales This Month"}
            columns={orderColumns}
            data={orderData}
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
                percentageChange >= 0
                  ? "bg-green-50 text-green-600"
                  : "bg-red-50 text-red-600"
              }`}
            >
              {percentageChange >= 0 ? "▲" : "▼"}
              {Math.abs(percentageChange).toFixed(0)}% vs last month
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
