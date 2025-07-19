import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import Hero from "@/components/organisms/Hero";
import MarketplaceCallout from "@/components/organisms/MarketplaceCallout";
import WhyAuton8n from "@/components/organisms/Features";
import CodeVsNoCode from "@/components/organisms/CodeVsNoCode";
import WorkflowPreview from "@/components/organisms/WorkflowPreview";
import Footer from "@/components/organisms/Footer";
const Landing = () => {
  const { isAuthenticated } = useAuth();

  // Redirect authenticated users to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

return (
    <div className="min-h-screen bg-dark-bg">
      <Hero />
      <MarketplaceCallout />
      <WhyAuton8n />
      <CodeVsNoCode />
      <WorkflowPreview />
      <Footer />
    </div>
  );
};

export default Landing;