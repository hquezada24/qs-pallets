export default function Table({ columns, data }) {
  const currentMonthTotal = data.reduce((acc, item) => acc + item.total, 0);

  const lastMonthTotal = 5200; // ejemplo real vendría del backend

  const percentageChange =
    ((currentMonthTotal - lastMonthTotal) / lastMonthTotal) * 100;
  return (
    <>
      <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="text-left px-4 py-3 font-medium text-gray-600"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((row, i) => (
              <tr
                key={i}
                className="border-b border-gray-100 hover:bg-gray-50 transition"
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 text-gray-800">
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
    </>
  );
}
