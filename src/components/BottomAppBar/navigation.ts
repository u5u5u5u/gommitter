import type { IconType } from "react-icons";
import { AiOutlineHome } from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";
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
    name: "repositories",
    href: "/repositories",
    icon: RiGitRepositoryLine,
  },
  {
    name: "profile",
    href: "/profile",
    icon: FaRegUserCircle,
  },
  {
    name: "signout",
  },
];

export default BottomAppBarNavigation;
