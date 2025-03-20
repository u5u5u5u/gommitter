import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserIconProps {
  user: {
    display_name: string;
    avatar_url: string;
  };
}

const UserIcon = ({ user }: UserIconProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Avatar>
        <AvatarImage src={user.avatar_url} alt={user.display_name} />
        <AvatarFallback>{user.display_name}</AvatarFallback>
      </Avatar>
      <span>{user.display_name}</span>
    </div>
  );
};

export default UserIcon;
