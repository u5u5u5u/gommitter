import { BiBarChart } from "react-icons/bi";

const ChartIcon = () => {
  return (
    <div className="flex items-center space-x-1 text-xs">
      <BiBarChart />
      <span>{Math.floor(Math.random() * 1000)}</span>
    </div>
  );
};

export default ChartIcon;
