import { Link } from "react-router-dom";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative overflow-hidden hero-bg py-20 sm:py-32 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl sm:text-7xl font-bold font-display tracking-tight text-white mb-6">
              Build powerful workflows
              <span className="gradient-text block">without writing code</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Create automation in seconds using AI or a guided builder
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
          >
            <Link to="/create">
              <Button size="xl" className="gradient-button text-white font-semibold px-8 py-4 text-lg neon-glow">
                <ApperIcon name="Zap" size={20} className="mr-2" />
                Start Building
              </Button>
            </Link>
            <Button size="xl" variant="outline" className="border-2 border-neon-purple text-neon-purple hover:bg-neon-purple/10 px-8 py-4 text-lg">
              <ApperIcon name="Play" size={20} className="mr-2" />
              See 2,000+ Ready Workflows
            </Button>
          </motion.div>

          {/* Workflow Visual */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative max-w-6xl mx-auto"
          >
            <div className="premium-card-glow p-8">
              <div className="flex items-center justify-center space-x-8">
                {/* Workflow Nodes */}
                <div className="workflow-node text-center animate-float">
                  <ApperIcon name="Globe" size={32} className="text-neon-blue mx-auto mb-2" />
                  <span className="text-sm text-gray-300">Trigger</span>
                </div>
                
                <motion.div 
                  className="w-12 h-0.5 bg-gradient-to-r from-neon-purple to-neon-blue"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                
                <div className="workflow-node text-center animate-float" style={{ animationDelay: '0.5s' }}>
                  <ApperIcon name="Filter" size={32} className="text-neon-orange mx-auto mb-2" />
                  <span className="text-sm text-gray-300">Process</span>
                </div>
                
                <motion.div 
                  className="w-12 h-0.5 bg-gradient-to-r from-neon-orange to-neon-purple"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                />
                
                <div className="workflow-node text-center animate-float" style={{ animationDelay: '1s' }}>
                  <ApperIcon name="Send" size={32} className="text-neon-purple mx-auto mb-2" />
                  <span className="text-sm text-gray-300">Action</span>
                </div>
              </div>
              
              <div className="text-center mt-6">
                <p className="text-gray-400 text-sm">Curved lines and workflow paths leading to automation</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-neon-purple/20 to-neon-blue/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-neon-orange/20 to-neon-purple/20 rounded-full blur-3xl animate-bounce-slow"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-neon-blue/10 rounded-full blur-2xl"></div>
      </div>
    </section>
  );
};

export default Hero;