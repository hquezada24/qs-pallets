import Image from "next/image";

const Logo = ({ border = false }) => {
  const borderClasses = border ? "border-b border-white/12" : "";
  return (
    <div
      className={`relative z-1 flex items-center ${borderClasses} px-6 pb-5 pt-7`}
    >
      <Image
        src="/qspallets.png"
        alt=""
        width={100}
        height={100}
        className="m-0"
        priority
      />
      <div>
        <div className="m-0 text-[1.2rem] font-extrabold leading-none tracking-[-0.02em] text-white">
          QS Pallets
        </div>
      </div>
    </div>
  );
};

export default Logo;
