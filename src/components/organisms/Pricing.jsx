import PricingCard from "@/components/molecules/PricingCard";
import { motion } from "framer-motion";

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: 0,
      features: [
        "3 workflows per month",
        "Basic prompt input",
        "JSON download",
        "Community support",
        "Basic instructions"
      ],
      workflowLimit: 3
    },
    {
      name: "Starter",
      price: 15,
      features: [
        "25 workflows per month",
        "Advanced AI generation",
        "Detailed instructions",
        "Workflow history",
        "Priority support",
        "Export templates"
      ],
      workflowLimit: 25,
      isPopular: true
    },
    {
      name: "Pro",
      price: 49,
      features: [
        "Unlimited workflows",
        "Voice input support",
        "Bulk generation",
        "Multiple export formats",
        "API access",
        "Custom templates",
        "Team collaboration"
      ],
      workflowLimit: -1
    }
  ];

  const handleSelectPlan = (plan) => {
    console.log("Selected plan:", plan.name);
  };

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-900 mb-4">
            Simple, <span className="gradient-text">Transparent</span> Pricing
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Choose the plan that fits your automation needs. Start free and scale as you grow.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <PricingCard 
                plan={plan} 
                isPopular={plan.isPopular}
                onSelect={handleSelectPlan}
              />
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-slate-600 mb-4">
            Need a custom solution for your team or enterprise?
          </p>
          <a href="#contact" className="text-primary-600 font-medium hover:text-primary-700 transition-colors">
            Contact us for enterprise pricing →
          </a>
        </div>
      </div>
    </section>
  );
};

export default Pricing;