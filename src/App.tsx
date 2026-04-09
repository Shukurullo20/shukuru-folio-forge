import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { VisitorInit } from "@/components/shared/VisitorInit";
import HomePage from "./pages/HomePage";
import BlogListPage from "./pages/BlogListPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import ProjectListPage from "./pages/ProjectListPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import ExperienceListPage from "./pages/ExperienceListPage";
import ExperienceDetailPage from "./pages/ExperienceDetailPage";
import KnowledgeListPage from "./pages/KnowledgeListPage";
import KnowledgeDetailPage from "./pages/KnowledgeDetailPage";
import ResumePage from "./pages/ResumePage";
import SkillsPage from "./pages/SkillsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60000, retry: 1 } },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <VisitorInit />
      <Navbar />
      <main className="max-w-[768px] mx-auto px-6 py-8 min-h-[calc(100vh-120px)]">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
          <Route path="/projects" element={<ProjectListPage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          <Route path="/experience" element={<ExperienceListPage />} />
          <Route path="/experience/:slug" element={<ExperienceDetailPage />} />
          <Route path="/knowledge" element={<KnowledgeListPage />} />
          <Route path="/knowledge/:slug" element={<KnowledgeDetailPage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
