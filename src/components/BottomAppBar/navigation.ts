import type { IconType } from "react-icons";
import { AiOutlineHome } from "react-icons/ai";
import { FaRegBell } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { MdMailOutline } from "react-icons/md";

interface BottomAppBarNavigationType {
  name: string;
  href?: string;
  icon?: IconType;
}

const BottomAppBarNavigation: BottomAppBarNavigationType[] = [
  {
    name: "home",
    href: "/",
    icon: AiOutlineHome,
  },
  {
    name: "search",
    href: "/search",
    icon: IoSearch,
  },
  {
    name: "notifications",
    href: "/notifications",
    icon: FaRegBell,
  },
  {
    name: "messages",
    href: "/messages",
    icon: MdMailOutline,
  },
];

export default BottomAppBarNavigation;
