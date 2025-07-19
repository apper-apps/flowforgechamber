import { Link } from "react-router-dom";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { motion } from "framer-motion";

const MarketplaceCallout = () => {
  const workflowExamples = [
    {
      icon: "FileText",
      name: "Typeform → Slack",
      description: "Form responses to team chat"
    },
    {
      icon: "Mail",
      name: "Gmail → Google Sheets",
      description: "Email data to spreadsheet"
    },
    {
      icon: "Calendar",
      name: "Cron → Airtable + Notion",
      description: "Scheduled data sync"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-dark-bg to-dark-surface/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-neon-purple/20 to-neon-blue/20 px-4 py-2 rounded-full border border-neon-purple/30 mb-6">
              <ApperIcon name="Rocket" size={20} className="text-neon-purple" />
              <span className="text-neon-purple font-medium">Marketplace</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold font-display text-white mb-4">
              Over <span className="gradient-text">2,055</span> Ready-to-Use n8n Workflows
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
              Instantly access automation templates built for sales, ops, marketing, data, and more — 
              all in downloadable .json format
            </p>
            <p className="text-lg text-neon-blue font-medium">
              Workflows you can import, tweak, and run today
            </p>
          </motion.div>
        </div>

        {/* Workflow Examples */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {workflowExamples.map((workflow, index) => (
            <motion.div
              key={workflow.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="premium-card-glow p-6 text-center card-hover-glow"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-neon-purple/20 to-neon-blue/20 rounded-lg flex items-center justify-center mb-4 mx-auto border border-neon-purple/30">
                <ApperIcon name={workflow.icon} size={24} className="text-neon-purple" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{workflow.name}</h3>
              <p className="text-gray-400 text-sm">{workflow.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to="/marketplace">
            <Button size="xl" className="gradient-button-secondary text-white font-semibold px-8 py-4 text-lg neon-glow">
              <ApperIcon name="Store" size={20} className="mr-2" />
              Explore Marketplace
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default MarketplaceCallout;