import Link from "next/link";

function HomeGrid({ bg, text, link }) {
  const bgColorClass =
    {
      blue: "bg-blue-200",
      red: "bg-red-200",
      green: "bg-green-200",
      yellow: "bg-yellow-200",
    }[bg] || "bg-gray-500";

  return (
    <Link href={link} className={`${bgColorClass} rounded-[10px] px-5 py-5 `}>
      {text}
    </Link>
  );
}

export default HomeGrid;
