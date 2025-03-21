import type { IconType } from "react-icons";
import { AiOutlineHome } from "react-icons/ai";
import { IoSearch } from "react-icons/io5";
import { MdMailOutline } from "react-icons/md";
import { RiGitRepositoryLine } from "react-icons/ri";

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
    name: "repositories",
    href: "/repositories",
    icon: RiGitRepositoryLine,
  },
  {
    name: "messages",
    href: "/messages",
    icon: MdMailOutline,
  },
];

export default BottomAppBarNavigation;
