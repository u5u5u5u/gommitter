import Link from "next/link";

const FloatButton = () => {
  return (
    <Link
      href="/repositories"
      className="fixed right-5 bottom-20 z-[9999] block bg-gray-300 w-14 h-14 text-center leading-[55px] text-2xl rounded-full shadow-md"
    >
      ＋
    </Link>
  );
};

export default FloatButton;
