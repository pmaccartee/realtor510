import { useRoute } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { insights } from "../data/insights";
import { Link } from "wouter";
import { useEffect } from "react";

export default function AnswerDetail() {
  const [, params] = useRoute("/answers/:id");
  const id = params?.id;
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  
  const insight = insights.find(i => i.id === id);

  if (!insight) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <main className="flex-1 pt-40 text-center">
          <h1 className="text-3xl font-serif mb-4">Insight not found</h1>
          <Link href="/answers" className="text-primary hover:underline flex items-center justify-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to all insights
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  // Split content by newlines to render paragraphs
  const paragraphs = insight.content.split('\n').filter((p: string) => p.trim() !== '');

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1 pt-32 pb-24 bg-white">
        <article className="max-w-4xl mx-auto px-6">
          <div className="mb-12">
            <Link href="/answers" className="inline-flex items-center text-sm font-bold text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Answers
            </Link>
            
            <div className="text-sm font-bold text-primary mb-4 uppercase tracking-wider">
              {insight.category}
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground leading-tight mb-8">
              {insight.title}
            </h1>
            
            <div className="w-24 h-1 bg-primary/20 mb-12"></div>
          </div>
          
          <div className="prose prose-lg md:prose-xl prose-p:font-light prose-p:leading-relaxed prose-p:text-muted-foreground max-w-none">
            {paragraphs.map((paragraph: string, index: number) => (
              <p key={index} className="mb-8">{paragraph}</p>
            ))}
          </div>
          
          <div className="mt-20 pt-12 border-t border-border">
            <div className="bg-secondary/30 p-8 rounded-lg flex flex-col items-center text-center">
              <h3 className="text-2xl font-serif mb-4">Have a specific question?</h3>
              <p className="text-muted-foreground font-light mb-6 max-w-md">
                Every transaction in the East Bay is unique. Let's discuss how these insights apply to your specific situation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-2xl mt-4">
                <a href="tel:5108594895" className="bg-primary text-white px-8 py-4 text-sm tracking-widest uppercase hover:bg-primary/90 transition-colors shadow-lg flex-1">
                  Call (510) 859-4895
                </a>
                <a href="mailto:patrick@realtor510.com" className="bg-white text-foreground border-2 border-border px-8 py-4 text-sm tracking-widest uppercase hover:border-primary hover:text-primary transition-colors shadow-sm flex-1">
                  Email patrick@realtor510.com
                </a>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}