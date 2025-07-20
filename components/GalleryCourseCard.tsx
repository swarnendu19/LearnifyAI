import { Chapter, Course, Unit } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { BookOpen, Clock, Users } from "lucide-react";

type Props = {
  course: Course & {
    units: (Unit & {
      chapters: Chapter[];
    })[];
  };
};

const GalleryCourseCard = async ({ course }: Props) => {
  const totalChapters = course.units.reduce((acc, unit) => acc + unit.chapters.length, 0);

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative overflow-hidden">
        <Link href={`/course/${course.id}/0/0`} className="block">
          <div className="relative aspect-video">
            <Image
              src={course.image || "/placeholder-course.jpg"}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              width={400}
              height={225}
              alt={`Course: ${course.name}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-white font-semibold text-lg line-clamp-2 mb-2">
                {course.name}
              </h3>
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <BookOpen className="w-4 h-4" />
                <span>{course.units.length} units</span>
                <span>•</span>
                <Clock className="w-4 h-4" />
                <span>{totalChapters} chapters</span>
              </div>
            </div>
          </div>
        </Link>
      </div>

      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="text-xs">
              <Users className="w-3 h-3 mr-1" />
              Course
            </Badge>
            <Badge variant="outline" className="text-xs">
              {course.units.length} Units
            </Badge>
          </div>

          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-3">Course Units</h4>
            <div className="space-y-2">
              {course.units.slice(0, 3).map((unit, unitIndex) => (
                <Link
                  href={`/course/${course.id}/${unitIndex}/0`}
                  key={unit.id}
                  className="block p-2 rounded-lg hover:bg-accent/50 transition-colors group/unit"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary/60 group-hover/unit:bg-primary transition-colors" />
                    <span className="text-sm text-foreground/80 group-hover/unit:text-foreground transition-colors line-clamp-1">
                      {unit.name}
                    </span>
                  </div>
                </Link>
              ))}
              {course.units.length > 3 && (
                <div className="text-xs text-muted-foreground pl-4">
                  +{course.units.length - 3} more units
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GalleryCourseCard;
