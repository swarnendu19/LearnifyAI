"use client";
import React from "react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { z } from "zod";
import { createChaptersSchema } from "@/validators/course";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Plus, Trash, BookOpen, Sparkles, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import SubscriptionAction from "./SubscriptionAction";

type Props = { isPro: boolean };

type Input = z.infer<typeof createChaptersSchema>;

const CreateCourseForm = ({ isPro }: Props) => {
  const router = useRouter();
  const { toast } = useToast();
  const { mutate: createChapters, isLoading } = useMutation({
    mutationFn: async ({ title, units }: Input) => {
      const response = await axios.post("/api/course/createChapters", {
        title,
        units,
      });
      return response.data;
    },
  });
  const form = useForm<Input>({
    resolver: zodResolver(createChaptersSchema),
    defaultValues: {
      title: "",
      units: ["", "", ""],
    },
  });

  function onSubmit(data: Input) {
    if (data.units.some((unit) => unit === "")) {
      toast({
        title: "Error",
        description: "Please fill all the units",
        variant: "destructive",
      });
      return;
    }
    createChapters(data, {
      onSuccess: ({ course_id }) => {
        toast({
          title: "Success",
          description: "Course created successfully",
        });
        router.push(`/create/${course_id}`);
      },
      onError: (error) => {
        console.error(error);
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
        });
      },
    });
  }

  form.watch();

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Create Your Course
          </h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Design an AI-powered learning experience tailored to your needs
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Course Title */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => {
                return (
                  <FormItem className="space-y-4">
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-5 h-5 text-primary" />
                      <FormLabel className="text-xl font-semibold">Course Title</FormLabel>
                    </div>
                    <FormControl>
                      <Input
                        placeholder="e.g., Introduction to Machine Learning, Advanced React Patterns..."
                        className="text-lg h-12"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
          </div>

          {/* Course Units */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-secondary/50 to-accent/30 rounded-lg">
                <BookOpen className="w-4 h-4 text-secondary-foreground" />
              </div>
              <h3 className="text-xl font-semibold">Course Units</h3>
              <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded-full">
                {form.watch("units").length} units
              </span>
            </div>

            <div className="space-y-4">
              <AnimatePresence>
                {form.watch("units").map((_, index) => {
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, height: 0, y: -10 }}
                      animate={{ opacity: 1, height: "auto", y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -10 }}
                      transition={{
                        duration: 0.3,
                        ease: "easeOut",
                      }}
                    >
                      <FormField
                        key={index}
                        control={form.control}
                        name={`units.${index}`}
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel className="text-sm font-medium text-muted-foreground">
                                Unit {index + 1}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder={`Enter unit ${index + 1} topic...`}
                                  className="h-11"
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          );
                        }}
                      />
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* Unit Controls */}
              <div className="flex items-center justify-center pt-4">
                <Separator className="flex-1" />
                <div className="flex gap-2 mx-4">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      form.setValue("units", [...form.watch("units"), ""]);
                    }}
                    className="flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Unit
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      form.setValue("units", form.watch("units").slice(0, -1));
                    }}
                    disabled={form.watch("units").length <= 1}
                    className="flex items-center gap-2"
                  >
                    <Trash className="w-4 h-4" />
                    Remove
                  </Button>
                </div>
                <Separator className="flex-1" />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex flex-col items-center gap-4">
            <Button
              disabled={isLoading}
              type="submit"
              variant="gradient"
              size="xl"
              className="w-full max-w-md"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Creating Course...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Create My Course
                </>
              )}
            </Button>
            <p className="text-xs text-muted-foreground text-center max-w-md">
              Our AI will generate comprehensive course content based on your specifications
            </p>
          </div>
        </form>
      </Form>

      {!isPro && (
        <div className="mt-8">
          <SubscriptionAction />
        </div>
      )}
    </div>
  );
};

export default CreateCourseForm;
