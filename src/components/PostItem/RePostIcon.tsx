import { AiOutlineRetweet } from "react-icons/ai";

const RePostIcon = () => {
  return (
    <div className="flex items-center space-x-1 text-xs">
      <AiOutlineRetweet />
      <span>{Math.floor(Math.random() * 10)}</span>
    </div>
  );
};

export default RePostIcon;
