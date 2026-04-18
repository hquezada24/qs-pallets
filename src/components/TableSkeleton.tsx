const TableSkeleton = () => {
  return (
    <div className="p-6 space-y-3">
      {/* Header */}
      <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
      {/* Filas */}
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex gap-4">
          <div className="h-4 bg-gray-100 rounded animate-pulse flex-1" />
          <div className="h-4 bg-gray-100 rounded animate-pulse w-20" />
          <div className="h-4 bg-gray-100 rounded animate-pulse w-12" />
        </div>
      ))}
    </div>
  );
};

export default TableSkeleton;
