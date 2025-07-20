import GalleryCourseCard from "@/components/GalleryCourseCard";
import { prisma } from "@/lib/db";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, BookOpen, Plus, RefreshCw } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {};

const GalleryPage = async (props: Props) => {
  let courses;
  let error = null;

  try {
    courses = await prisma.course.findMany({
      include: {
        units: {
          include: { chapters: true },
        },
      },
    });
  } catch (err) {
    console.error("Database connection error:", err);
    error = err;
    courses = [];
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-destructive/10 rounded-full">
                <AlertCircle className="w-6 h-6 text-destructive" />
              </div>
            </div>
            <CardTitle className="text-xl">Database Connection Error</CardTitle>
            <CardDescription>
              Unable to connect to the database. This might be a temporary issue.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
              <p className="font-medium mb-1">Possible solutions:</p>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>Check your internet connection</li>
                <li>Verify database credentials in .env file</li>
                <li>Ensure database server is running</li>
                <li>Try refreshing the page</li>
              </ul>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                className="flex-1"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Retry
              </Button>
              <Button asChild className="flex-1">
                <Link href="/">
                  Go Home
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Course Gallery
            </h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our collection of AI-generated courses created by the community
          </p>
        </div>

        {/* Courses Grid */}
        {courses.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {courses.map((course) => (
              <GalleryCourseCard course={course} key={course.id} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Card className="max-w-md mx-auto">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-muted rounded-full">
                    <BookOpen className="w-6 h-6 text-muted-foreground" />
                  </div>
                </div>
                <CardTitle>No Courses Yet</CardTitle>
                <CardDescription>
                  Be the first to create a course and share it with the community!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full" variant="gradient">
                  <Link href="/create">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First Course
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryPage;
