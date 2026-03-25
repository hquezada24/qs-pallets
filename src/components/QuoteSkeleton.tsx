const Pulse = ({ className }: { className: string }) => (
  <div className={`animate-pulse rounded bg-gray-200 ${className}`} />
);

const QuoteSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 flex flex-col items-center gap-6">
      {/* Header card */}
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-6">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-3">
            <Pulse className="h-7 w-48" />
            <Pulse className="h-4 w-32" />
          </div>
          <div className="flex flex-col items-end gap-3">
            <Pulse className="h-6 w-24 rounded-full" />
            <Pulse className="h-4 w-28" />
          </div>
        </div>
      </div>

      {/* Contact & Address card */}
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-6">
        <Pulse className="h-4 w-24 mb-5" />
        <div className="grid grid-cols-2 gap-x-12 gap-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <Pulse className="h-3 w-16" />
              <Pulse className="h-4 w-36" />
            </div>
          ))}
        </div>
      </div>

      {/* Product card */}
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-6">
        <Pulse className="h-4 w-20 mb-5" />
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center border border-gray-100 rounded-xl p-4">
            <div className="flex flex-col gap-2">
              <Pulse className="h-5 w-40" />
              <Pulse className="h-3 w-20" />
            </div>
            <div className="flex gap-8">
              <div className="flex flex-col items-end gap-2">
                <Pulse className="h-3 w-12" />
                <Pulse className="h-5 w-10" />
              </div>
              <div className="flex flex-col items-end gap-2">
                <Pulse className="h-3 w-12" />
                <Pulse className="h-5 w-16" />
              </div>
            </div>
          </div>
        </div>

        {/* Custom dimensions */}
        <Pulse className="h-4 w-36 mt-6 mb-4" />
        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col gap-2 bg-gray-50 rounded-xl p-3"
            >
              <Pulse className="h-3 w-14" />
              <Pulse className="h-5 w-20" />
            </div>
          ))}
        </div>
      </div>

      {/* Additional details card */}
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-6">
        <Pulse className="h-4 w-36 mb-4" />
        <Pulse className="h-3 w-full mb-2" />
        <Pulse className="h-3 w-4/5 mb-2" />
        <Pulse className="h-3 w-3/5" />
      </div>
    </div>
  );
};

export default QuoteSkeleton;
