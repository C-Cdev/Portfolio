import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { About } from '@/components/about';
import { Contact } from '@/components/contact';
import { Footer } from '@/components/footer';
import { Hero } from '@/components/hero';
import { Navbar, ProgressPill } from '@/components/navigation';
import { Projects } from '@/components/projects';
import { Studies } from '@/components/studies';
import { TechStack } from '@/components/tech-stack';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-[100dvh] overflow-x-clip bg-[#0A0D0C]">
          <Navbar />
          <ProgressPill />
          <main>
            <Hero />
            <About />
            <TechStack />
            <Projects />
            <Studies />
            <Contact />
          </main>
          <Footer />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
