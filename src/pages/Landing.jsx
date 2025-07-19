import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import Hero from "@/components/organisms/Hero";
import Features from "@/components/organisms/Features";
import Pricing from "@/components/organisms/Pricing";
import Footer from "@/components/organisms/Footer";

const Landing = () => {
  const { isAuthenticated } = useAuth();

  // Redirect authenticated users to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <Pricing />
      <Footer />
    </div>
  );
};

export default Landing;