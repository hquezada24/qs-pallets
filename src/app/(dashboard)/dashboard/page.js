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
    <>
      <style>{`
   

.card {
  background: white;
  border-radius: 12px;
  padding: 1.25rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

/* Desktop layout */
@media (min-width: 1024px) {
  .dashboard-grid {
    grid-template-columns: 2fr 1fr;
  }

  .chart {
    grid-column: 1 / 2;
  }

  .table {
    grid-column: 2 / 3;
  } 
}
    `}</style>
      <div className="items-center py-8 space-y-5">
        <div className="nav-options flex justify-evenly">
          <DashboardNav bg={"blue"} text={"New Orders"} />
          <DashboardNav bg={"red"} text={"Open Quotes"} />
          <DashboardNav bg={"green"} text={"Total Inventory"} />
          <DashboardNav bg={"yellow"} text={"Customers"} />
        </div>
        <div
          className="grid gap-6 p-4 bg-gray-200 
                grid-cols-1 
                lg:grid-cols-[2fr_1fr]"
        >
          <DashboardHomeGraph className="card chart" />
          <div className="card table">
            <Table columns={orderColumns} data={orderData} />
            <p className="text-lg font-bold text-gray-900">
              Month total ${currentMonthTotal.toLocaleString()}
            </p>
            <div
              className={`text-sm font-medium ${
                percentageChange >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {percentageChange >= 0 ? "▲" : "▼"}{" "}
              {Math.abs(percentageChange).toFixed(0)}% from last month
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardHome;
