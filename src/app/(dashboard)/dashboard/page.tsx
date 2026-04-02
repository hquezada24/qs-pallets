import DashboardNav from "@/components/DashboardNav";
import DashboardHomeGraph from "@/components/DashboardHomeGraph";
import SalesSummaryCard from "@/components/SalesSummaryCard";
import Order from "@/models/Order";
import { IOrder } from "@/types/order";

const orderColumns = [
  { key: "orderNumber", header: "Orden #" },
  { key: "name", header: "Cliente" },
  { key: "companyName", header: "Company" },
  {
    key: "total",
    header: "Total",
    render: (value) => `$${value.toLocaleString()}`,
  },
];

const orderData = [
  { id: 101, customer: "Juan Pérez", total: 1500, status: "Pagado" },
  { id: 102, customer: "Empresa XYZ", total: 2300, status: "Pendiente" },
];

const DashboardHome = async () => {
  const orders: IOrder[] = await Order.find({ status: "DELIVERED" })
    .populate("customer")
    .lean();

  const ordersObj = orders.map((order) => ({
    // customer flatten
    orderNumber: order.orderNumber,
    name: order.customer?.name,
    companyName: order.customer?.companyName,
    total: order.total,
  }));

  const now = new Date();

  const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const lastMonthEnd = new Date(
    now.getFullYear(),
    now.getMonth(),
    0,
    23,
    59,
    59,
  );

  const lastMonthSales = await Order.find({
    status: "DELIVERED",
    createdAt: {
      $gte: lastMonthStart,
      $lte: lastMonthEnd,
    },
  }).lean();

  const currentMonthSales = await Order.find({
    status: "delivered",
    createdAt: {
      $gte: currentMonthStart,
    },
  }).lean();

  const lastMonthTotal = lastMonthSales.reduce(
    (acc, item) => acc + item.total,
    0,
  );

  const currentMonthTotal = currentMonthSales.reduce(
    (acc, item) => acc + item.total,
    0,
  );

  console.log("Last Month: ", lastMonthTotal);
  console.log("Current Month: ", currentMonthTotal);

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

        <SalesSummaryCard sales={ordersObj} lastMonthSales={lastMonthTotal} />
      </div>
    </div>
  );
};

export default DashboardHome;
