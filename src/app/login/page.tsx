import SocialLoginButton from "@/components/auth/SocialLoginButton";

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="">
        <SocialLoginButton provider="github" />
      </div>
    </div>
  );
};

export default LoginPage;
