import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingProps {
    className?: string;
    size?: "sm" | "md" | "lg";
    text?: string;
}

export function Loading({ className, size = "md", text }: LoadingProps) {
    const sizeClasses = {
        sm: "w-4 h-4",
        md: "w-6 h-6",
        lg: "w-8 h-8",
    };

    return (
        <div className={cn("flex items-center justify-center gap-2", className)}>
            <Loader2 className={cn("animate-spin text-primary", sizeClasses[size])} />
            {text && <span className="text-sm text-muted-foreground">{text}</span>}
        </div>
    );
}

export function LoadingPage({ text = "Loading..." }: { text?: string }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center space-y-4">
                <Loading size="lg" />
                <p className="text-muted-foreground">{text}</p>
            </div>
        </div>
    );
}