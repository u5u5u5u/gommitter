import { FaRegHeart } from "react-icons/fa";

const HeartIcon = () => {
  return (
    <div className="flex items-center space-x-1 text-xs">
      <FaRegHeart />
      <span>10</span>
    </div>
  );
};

export default HeartIcon;
