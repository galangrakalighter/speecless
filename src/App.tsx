import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Index from "./pages/Index";
import Produk from "./pages/Produk";
import Login from "./pages/Login";
import CMSArtikel from "./pages/CMSArtikel";
import ArticleDetail from "./pages/ArticleDetail";
import Testimoni from "./pages/Testimoni";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/produk" element={<Produk />} />
          <Route path="/testimoni" element={<Testimoni />} />
          <Route
            path="/artikel/:id"
            element={<ArticleDetail />}
          />

          <Route path="/login" element={<Login />} />

          <Route
            path="/cms_artikel"
            element={
              <ProtectedRoute>
                <CMSArtikel />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;