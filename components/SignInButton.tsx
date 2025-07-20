"use client";
import React from "react";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import { LogIn, Sparkles } from "lucide-react";

type Props = {};

const SignInButton = (props: Props) => {
  return (
    <Button
      variant="gradient"
      size="sm"
      onClick={() => {
        signIn("google");
      }}
      className="group"
    >
      <LogIn className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
      Sign In
      <Sparkles className="w-3 h-3 ml-1 opacity-70" />
    </Button>
  );
};

export default SignInButton;
