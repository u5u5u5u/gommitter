import SocialLoginButton from "@/components/auth/SocialLoginButton";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Button className="">
        <FaGithub />
        <SocialLoginButton provider="github" />
      </Button>
    </div>
  );
};

export default LoginPage;
