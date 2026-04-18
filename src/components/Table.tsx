type Column<T> = {
  key: string;
  header: string;
  render?: (value: any, row: T) => React.ReactNode;
};

type TableProps<T> = {
  title: string;
  columns: Column<T>[];
  data: T[];
  hover?: "Yes" | "No";
  keyField: string;
};

export default function Table<T>({
  title,
  columns,
  data,
  keyField,
  hover = "Yes",
}: TableProps<T>) {
  const hoverStyle = {
    Yes: "hover:bg-gray-50",
    No: "",
  };

  const hoverClass = hoverStyle[hover];

  return (
    <>
      <h2 className="text-lg font-semibold mb-4 text-center">{title}</h2>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-visible">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="text-center px-4 py-3 font-medium text-gray-600"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((row) => (
              <tr
                key={row.orderNumber}
                className={`border-b border-gray-100 ${hoverClass} transition`}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="px-4 py-3 text-gray-800 text-center"
                  >
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
