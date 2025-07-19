import { Link } from "react-router-dom";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-purple-50 py-20 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-6xl font-bold font-display tracking-tight text-slate-900 mb-6">
              Describe Your Workflow.
              <span className="gradient-text block">Download It. Automate with n8n.</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Create AI-generated workflow files you can import into n8n — no coding required. 
              Turn your automation ideas into reality in minutes.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link to="/create">
              <Button size="xl" className="shadow-2xl">
                <ApperIcon name="Zap" size={20} className="mr-2" />
                Get Started Free
              </Button>
            </Link>
            <Button size="xl" variant="outline">
              <ApperIcon name="Play" size={20} className="mr-2" />
              Watch Demo
            </Button>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative max-w-5xl mx-auto"
          >
            <div className="premium-card p-8 bg-gradient-to-br from-white to-slate-50">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-sm text-slate-500 ml-4">FlowForge Workflow Creator</span>
                </div>
                <div className="text-left space-y-3">
                  <div className="text-sm text-slate-600">What should your workflow do?</div>
                  <div className="bg-slate-100 p-4 rounded-lg font-mono text-sm">
                    "Send me a Slack message when someone fills out a Google Form"
                  </div>
                  <div className="flex justify-end">
                    <Button size="sm">
                      <ApperIcon name="Sparkles" size={16} className="mr-2" />
                      Generate Workflow
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-primary-300 to-purple-300 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-r from-accent-300 to-primary-300 rounded-full blur-2xl opacity-20"></div>
      </div>
    </section>
  );
};

export default Hero;