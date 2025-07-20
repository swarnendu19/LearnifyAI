import { SignInForm } from "@/components/SignInForm";

const page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-accent/5 p-4">
      <SignInForm />
    </div>
  );
};

export default page;