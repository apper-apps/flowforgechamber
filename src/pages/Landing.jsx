import Hero from "@/components/organisms/Hero";
import Features from "@/components/organisms/Features";
import Pricing from "@/components/organisms/Pricing";
import Footer from "@/components/organisms/Footer";

const Landing = () => {
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