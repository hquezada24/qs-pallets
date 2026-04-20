import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-start justify-center min-h-[60vh] px-12 py-20">
      <p className="text-xs font-medium tracking-widest uppercase text-green-600 mb-5">
        Error 404
      </p>

      <h1 className="text-5xl font-medium text-gray-900 leading-tight mb-6 max-w-lg">
        Page not found
      </h1>

      <div className="w-10 h-0.5 bg-green-600 mb-8" />

      <p className="text-base text-gray-500 leading-relaxed max-w-md mb-12">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Check the URL or head back to find what you need.
      </p>

      <div className="flex items-center gap-7">
        <Link
          href="/"
          className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium
                     px-6 py-3 rounded transition-colors"
        >
          Go to homepage
        </Link>

        <Link
          href="/products"
          className="text-sm text-gray-400 hover:text-gray-700 transition-colors
                     flex items-center gap-1.5"
        >
          <span>←</span> Browse products
        </Link>
      </div>
    </div>
  );
}
