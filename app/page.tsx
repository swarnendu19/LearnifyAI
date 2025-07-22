import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Sparkles, Zap, Users, Trophy } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-16">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                AI-Powered Learning Platform
              </div>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent leading-tight">
                Learn Anything
                <br />
                With the Power of AI
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Transform YouTube videos into structured learning experiences with our AI-powered course generator. Create, share, and master any topic with intelligent course creation.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild variant="gradient" size="xl" className="group">
                <Link href="/create">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Start Creating
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="xl">
                <Link href="/gallery">
                  Browse Gallery
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Learning Journey?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Experience the future of online learning with our cutting-edge AI technology
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 bg-card border border-border rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">AI-Powered Generation</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our advanced AI analyzes YouTube videos and creates structured, comprehensive courses with chapters, summaries, and quizzes.
              </p>
            </div>

            <div className="group p-8 bg-card border border-border rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6 text-secondary-foreground" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Collaborative Learning</h3>
              <p className="text-muted-foreground leading-relaxed">
                Share your courses with others, explore community-created content, and learn together in an engaging environment.
              </p>
            </div>

            <div className="group p-8 bg-card border border-border rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-secondary/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Trophy className="w-6 h-6 text-accent-foreground" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Track Progress</h3>
              <p className="text-muted-foreground leading-relaxed">
                Monitor your learning journey with detailed progress tracking, completion certificates, and personalized recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 rounded-2xl p-12 border border-border">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Learning?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of learners who are already creating amazing courses with our AI-powered platform.
            </p>
            <Button asChild variant="gradient" size="xl" className="group">
              <Link href="/create">
                <Sparkles className="w-5 h-5 mr-2" />
                Get Started Now
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
