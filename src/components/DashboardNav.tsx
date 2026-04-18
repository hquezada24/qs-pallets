import Link from "next/link";

function HomeGrid({ bg, text, link }) {
  const styles = {
    blue: {
      pill: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 hover:border-blue-300",
      dot: "bg-blue-500",
    },
    red: {
      pill: "bg-red-50 text-red-700 border-red-200 hover:bg-red-100 hover:border-red-300",
      dot: "bg-red-500",
    },
    green: {
      pill: "bg-green-50 text-green-700 border-green-200 hover:bg-green-100 hover:border-green-300",
      dot: "bg-green-500",
    },
    yellow: {
      pill: "bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100 hover:border-yellow-300",
      dot: "bg-yellow-500",
    },
  }[bg] || {
    pill: "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100",
    dot: "bg-gray-500",
  };

  return (
    <Link
      href={link}
      className={`${styles.pill} inline-flex items-center gap-2 border rounded-full px-5 py-2 text-sm font-medium transition-colors duration-150`}
    >
      <span className={`${styles.dot} w-2 h-2 rounded-full`} />
      {text}
    </Link>
  );
}

export default HomeGrid;
