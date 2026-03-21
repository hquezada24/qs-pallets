const ProductsSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
    {[...Array(4)].map((_, i) => (
      <div
        key={i}
        className="flex items-center justify-between gap-4 bg-white border-2 border-[#e2e8f0] rounded-lg px-4 py-3"
      >
        {/* Icon + texto */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gray-200 animate-pulse shrink-0" />
          <div className="space-y-1.5">
            <div className="h-3.5 w-24 bg-gray-200 rounded animate-pulse" />
            <div className="h-2.5 w-14 bg-gray-100 rounded animate-pulse" />
          </div>
        </div>
        {/* Stepper */}
        <div className="flex items-center gap-1">
          <div className="w-7 h-7 rounded-md bg-gray-100 animate-pulse" />
          <div className="w-12 h-7 rounded-md bg-gray-100 animate-pulse" />
          <div className="w-7 h-7 rounded-md bg-gray-100 animate-pulse" />
        </div>
      </div>
    ))}
  </div>
);

export default ProductsSkeleton;
