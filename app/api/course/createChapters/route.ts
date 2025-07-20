// /api/course/createChapters

import { NextResponse } from "next/server";
import { createChaptersSchema } from "@/validators/course";
import { ZodError } from "zod";
import { strict_output } from "@/lib/gpt";
import { getUnsplashImage } from "@/lib/unsplash";
import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { checkSubscription } from "@/lib/subscription";

export async function POST(req: Request, res: Response) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user exists in database, create if not
    let user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      // Create user if they don't exist
      user = await prisma.user.create({
        data: {
          id: session.user.id,
          name: session.user.name,
          email: session.user.email,
          image: session.user.image,
          credits: 10, // Default credits
        },
      });
    }

    const isPro = await checkSubscription();
    if (user.credits <= 0 && !isPro) {
      return NextResponse.json({ error: "No credits remaining" }, { status: 402 });
    }

    const body = await req.json();
    const { title, units } = createChaptersSchema.parse(body);

    type outputUnits = {
      title: string;
      chapters: {
        youtube_search_query: string;
        chapter_title: string;
      }[];
    }[];

    // Generate course content with better error handling
    let output_units: outputUnits;
    try {
      output_units = await strict_output(
        "You are an AI capable of curating course content, coming up with relevant chapter titles, and finding relevant youtube videos for each chapter",
        units.map(unit =>
          `Create a comprehensive unit about "${unit}" as part of a course titled "${title}". Generate relevant chapters with detailed YouTube search queries that will find educational videos for each chapter.`
        ),
        {
          title: "title of the unit",
          chapters: "an array of chapters, each chapter should have a youtube_search_query and a chapter_title key in the JSON object",
        },
        "",
        false,
        "gpt-3.5-turbo",
        0.7, // Lower temperature for more consistent output
        3,
        true // Enable verbose logging for debugging
      );

      // Validate the output
      if (!Array.isArray(output_units) || output_units.length === 0) {
        throw new Error("Invalid course structure generated");
      }
    } catch (gptError) {
      console.error("GPT generation error:", gptError);
      return NextResponse.json({
        error: "Failed to generate course content. Please try again."
      }, { status: 500 });
    }

    // Generate course image
    let course_image = "/placeholder-course.jpg"; // Default fallback
    try {
      const imageSearchTerm = await strict_output(
        "you are an AI capable of finding the most relevant image for a course",
        `Please provide a good image search term for the title of a course about ${title}. This search term will be fed into the unsplash API, so make sure it is a good search term that will return good results`,
        {
          image_search_term: "a good search term for the title of the course",
        }
      );

      course_image = await getUnsplashImage(imageSearchTerm.image_search_term);
    } catch (imageError) {
      console.error("Image generation error:", imageError);
      // Continue with default image
    }

    // Create course in database
    const course = await prisma.course.create({
      data: {
        name: title,
        image: course_image,
      },
    });

    // Create units and chapters
    for (const unit of output_units) {
      const unitTitle = unit.title;
      const prismaUnit = await prisma.unit.create({
        data: {
          name: unitTitle,
          courseId: course.id,
        },
      });

      if (unit.chapters && Array.isArray(unit.chapters)) {
        await prisma.chapter.createMany({
          data: unit.chapters.map((chapter) => ({
            name: chapter.chapter_title,
            youtubeSearchQuery: chapter.youtube_search_query,
            unitId: prismaUnit.id,
          })),
        });
      }
    }

    // Update user credits only if not pro
    if (!isPro) {
      await prisma.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          credits: {
            decrement: 1,
          },
        },
      });
    }

    return NextResponse.json({
      course_id: course.id,
      message: "Course created successfully"
    });

  } catch (error) {
    console.error("Course creation error:", error);

    if (error instanceof ZodError) {
      return NextResponse.json({
        error: "Invalid request data",
        details: error.errors
      }, { status: 400 });
    }

    return NextResponse.json({
      error: "Internal server error. Please try again."
    }, { status: 500 });
  }
}
