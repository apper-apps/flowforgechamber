import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import { motion } from "framer-motion";

const Features = () => {
  const features = [
    {
      icon: "Brain",
      title: "AI-Powered Generation",
      description: "Advanced GPT-4 integration transforms your natural language descriptions into functional n8n workflows."
    },
    {
      icon: "Download",
      title: "Instant Download",
      description: "Get ready-to-use JSON files that import seamlessly into your n8n instance with zero configuration."
    },
    {
      icon: "FileText",
      title: "Step-by-Step Instructions",
      description: "Detailed setup guides ensure you can implement your workflows correctly, even as a beginner."
    },
    {
      icon: "Zap",
      title: "No Coding Required",
      description: "Create complex automation workflows without writing a single line of code or learning n8n syntax."
    },
    {
      icon: "Clock",
      title: "Save Hours of Work",
      description: "What used to take hours of research and trial-and-error now happens in minutes with AI assistance."
    },
    {
      icon: "Layers",
      title: "Complex Workflows",
      description: "Generate sophisticated multi-step workflows with conditional logic, data transformations, and integrations."
    }
  ];

  return (
    <section id="features" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-900 mb-4">
            From Idea to <span className="gradient-text">Automation</span> in Minutes
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            FlowForge eliminates the complexity of workflow creation, letting you focus on what matters most - your business automation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 group">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <ApperIcon name={feature.icon} size={24} className="text-primary-600" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-slate-900">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;