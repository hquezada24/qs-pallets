import DashboardNav from "@/components/DashboardNav";
import DashboardHomeGraph from "@/components/DashboardHomeGraph";

const DashboardHome = () => {
  return (
    <>
      <style>{`
    .dashboard-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  padding: 1rem;
  margin-top: 1rem;
}

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
    grid-column: -1 / span 2;
  }

  /* .table {
    grid-column: 2 / 3;
  } */
}
    `}</style>
      <div className="items-center py-8">
        <div className="nav-options flex justify-evenly">
          <DashboardNav bg={"blue"} text={"New Orders"} />
          <DashboardNav bg={"red"} text={"Open Quotes"} />
          <DashboardNav bg={"green"} text={"Total Inventory"} />
          <DashboardNav bg={"yellow"} text={"Customers"} />
        </div>
        <div className="graphs-tables dashboard-grid bg-gray-200 ">
          <DashboardHomeGraph className="card chart" />
        </div>
      </div>
    </>
  );
};

export default DashboardHome;
