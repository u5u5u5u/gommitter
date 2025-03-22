import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

interface UserIconProps {
  user: {
    id: number;
    display_name: string;
    avatar_url: string;
  };
}

const UserIcon = ({ user }: UserIconProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Link href={`/profile/${user.id}`}>
        <Avatar>
          <AvatarImage src={user.avatar_url} alt={user.display_name} />
          <AvatarFallback>{user.display_name}</AvatarFallback>
        </Avatar>
      </Link>
      <span className="font-semibold">{user.display_name}</span>
    </div>
  );
};

export default UserIcon;
