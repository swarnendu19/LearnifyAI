"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signIn } from "next-auth/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { BookOpen, Mail, ArrowRight, Sparkles, Shield, Zap } from "lucide-react";
import Link from "next/link";

export function SignInForm() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        try {
            await signIn("google", { callbackUrl: "/" });
        } catch (error) {
            console.error("Sign in error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle email sign in logic here
        console.log("Email sign in:", email);
    };

    return (
        <div className="w-full max-w-md">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Card className="shadow-2xl border-0 bg-card/80 backdrop-blur-sm">
                    <CardHeader className="text-center space-y-4">
                        <div className="flex items-center justify-center">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl blur-sm" />
                                <div className="relative bg-gradient-to-br from-primary to-primary/80 p-3 rounded-xl shadow-lg">
                                    <BookOpen className="w-6 h-6 text-primary-foreground" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                                Welcome Back
                            </CardTitle>
                            <CardDescription className="text-base">
                                Sign in to continue your learning journey
                            </CardDescription>
                        </div>

                        <div className="flex items-center justify-center gap-2">
                            <Badge variant="secondary" className="text-xs">
                                <Zap className="w-3 h-3 mr-1" />
                                AI-Powered
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                                <Shield className="w-3 h-3 mr-1" />
                                Secure
                            </Badge>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {/* Google Sign In */}
                        <Button
                            onClick={handleGoogleSignIn}
                            disabled={isLoading}
                            variant="outline"
                            size="lg"
                            className="w-full group relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative flex items-center justify-center gap-3">
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path
                                        fill="#4285F4"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="#34A853"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="#FBBC05"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    />
                                    <path
                                        fill="#EA4335"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    />
                                </svg>
                                <span className="font-medium">Continue with Google</span>
                            </div>
                        </Button>

                        {/* Divider */}
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <Separator className="w-full" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-card px-2 text-muted-foreground">Or continue with email</span>
                            </div>
                        </div>

                        {/* Email Form */}
                        <form onSubmit={handleEmailSubmit} className="space-y-4">
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    type="email"
                                    placeholder="Enter your email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10 h-12"
                                    required
                                />
                            </div>

                            <Button
                                type="submit"
                                variant="gradient"
                                size="lg"
                                className="w-full group"
                                disabled={!email || isLoading}
                            >
                                <span>Continue with Email</span>
                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </form>

                        {/* Footer */}
                        <div className="text-center space-y-4">
                            <p className="text-xs text-muted-foreground">
                                By signing in, you agree to our{" "}
                                <Link href="/terms" className="underline hover:text-foreground transition-colors">
                                    Terms of Service
                                </Link>{" "}
                                and{" "}
                                <Link href="/privacy" className="underline hover:text-foreground transition-colors">
                                    Privacy Policy
                                </Link>
                            </p>

                            <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                                <Link href="/" className="hover:text-foreground transition-colors flex items-center gap-1">
                                    <BookOpen className="w-3 h-3" />
                                    Home
                                </Link>
                                <Link href="/gallery" className="hover:text-foreground transition-colors flex items-center gap-1">
                                    <Sparkles className="w-3 h-3" />
                                    Gallery
                                </Link>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}