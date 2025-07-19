import { motion } from "framer-motion";
import React from "react";
import ApperIcon from "@/components/ApperIcon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";

const WhyAuton8n = () => {
  const features = [
    {
      icon: "Layers",
      title: "500+ integrations",
      description: "Connect with all your favorite tools and services seamlessly"
    },
    {
      icon: "Brain",
      title: "AI workflow builder",
      description: "Let AI create complex workflows from simple descriptions"
    },
    {
      icon: "Code",
      title: "No-code + logic support",
      description: "Visual builder with the power of custom code when needed"
    },
    {
      icon: "Palette",
      title: "White-label ready",
      description: "Fully customizable interface for your customers"
    }
  ];

  return (
    <section id="why-auton8n" className="py-20 bg-dark-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold font-display text-white mb-8">
              Why <span className="gradient-text">auton8n</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Automation for your customers
            </p>
            <div className="space-y-6 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-neon-purple/20 to-neon-blue/20 rounded-lg flex items-center justify-center flex-shrink-0 border border-neon-purple/30">
                    <ApperIcon name={feature.icon} size={20} className="text-neon-purple" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <Button size="lg" className="gradient-button text-white font-semibold neon-glow">
              <ApperIcon name="Embed" size={20} className="mr-2" />
              Try auton8n Embed
            </Button>
          </motion.div>

          {/* Right - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="premium-card-glow p-8 bg-gradient-to-br from-dark-surface/80 to-dark-bg/60">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Workflow Builder</span>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-neon-purple rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-neon-blue rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <div className="w-2 h-2 bg-neon-orange rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-dark-bg/60 p-3 rounded-lg border border-neon-purple/30">
                    <div className="flex items-center space-x-3">
                      <ApperIcon name="Webhook" size={16} className="text-neon-blue" />
                      <span className="text-white text-sm">HTTP Request Trigger</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <div className="w-0.5 h-6 bg-gradient-to-b from-neon-blue to-neon-purple"></div>
                  </div>
                  
                  <div className="bg-dark-bg/60 p-3 rounded-lg border border-neon-orange/30">
                    <div className="flex items-center space-x-3">
                      <ApperIcon name="Filter" size={16} className="text-neon-orange" />
                      <span className="text-white text-sm">Data Processing</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <div className="w-0.5 h-6 bg-gradient-to-b from-neon-orange to-neon-purple"></div>
                  </div>
                  
                  <div className="bg-dark-bg/60 p-3 rounded-lg border border-neon-purple/30">
                    <div className="flex items-center space-x-3">
                      <ApperIcon name="Send" size={16} className="text-neon-purple" />
                      <span className="text-white text-sm">Send Notification</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyAuton8n;