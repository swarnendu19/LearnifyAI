
import Link from "next/link";
import React from "react";
import SignInButton from "./SignInButton";
import { getAuthSession } from "@/lib/auth";
import UserAccountNav from "./UserAccountNav";
import { ThemeToggle } from "./ThemeToggle";
import { BookOpen, Sparkles } from "lucide-react";

type Props = {};

const Navbar = async (props: Props) => {
  const session = await getAuthSession();
  return (
    <nav className="fixed inset-x-0 top-0 bg-background/80 backdrop-blur-md border-b border-border z-50 h-16">
      <div className="flex items-center justify-between h-full px-6 mx-auto max-w-7xl">
        {/* Logo */}
        <Link href="/gallery" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl blur-sm group-hover:blur-md transition-all duration-300" />
            <div className="relative bg-gradient-to-br from-primary to-primary/80 p-2 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Learning Journey
            </h1>
            <p className="text-xs text-muted-foreground -mt-1">AI-Powered Learning</p>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-1">
            <Link
              href="/gallery"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-lg transition-all duration-200"
            >
              Gallery
            </Link>
            {session?.user && (
              <>
                <Link
                  href="/create"
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-lg transition-all duration-200 flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  Create Course
                </Link>
                <Link
                  href="/settings"
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-lg transition-all duration-200"
                >
                  Settings
                </Link>
              </>
            )}
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            {session?.user ? (
              <UserAccountNav user={session.user} />
            ) : (
              <SignInButton />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
