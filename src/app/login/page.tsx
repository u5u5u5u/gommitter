import SocialLoginButton from "@/components/auth/SocialLoginButton";

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <SocialLoginButton provider="github" />
    </div>
  );
};

export default LoginPage;
