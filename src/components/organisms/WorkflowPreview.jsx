import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { motion } from "framer-motion";

const WorkflowPreview = () => {
  const workflowNodes = [
    { id: 1, icon: "Webhook", label: "Webhook", position: { x: 50, y: 100 } },
    { id: 2, icon: "Filter", label: "Filter", position: { x: 250, y: 60 } },
    { id: 3, icon: "Code", label: "Function", position: { x: 250, y: 140 } },
    { id: 4, icon: "Database", label: "Database", position: { x: 450, y: 80 } },
    { id: 5, icon: "Mail", label: "Email", position: { x: 450, y: 120 } }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-dark-bg to-dark-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold font-display text-white mb-6">
              Build workflows <span className="gradient-text">your way</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Insert conditions, branches, loops, or logic — the same way power users do in n8n
            </p>
          </motion.div>
        </div>

        {/* Workflow Canvas */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative max-w-6xl mx-auto mb-12"
        >
          <div className="premium-card-glow p-12 bg-gradient-to-br from-dark-surface/80 to-dark-bg/60 min-h-80">
            <div className="relative">
              {/* Connection Lines */}
              <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
                {/* Webhook to Filter/Function */}
                <motion.path
                  d="M 150 120 Q 200 100 250 80"
                  stroke="url(#gradient1)"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 1 }}
                />
                <motion.path
                  d="M 150 120 Q 200 140 250 160"
                  stroke="url(#gradient2)"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 1.2 }}
                />
                
                {/* Filter/Function to Database/Email */}
                <motion.path
                  d="M 350 80 Q 400 80 450 100"
                  stroke="url(#gradient3)"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 1.4 }}
                />
                <motion.path
                  d="M 350 160 Q 400 150 450 140"
                  stroke="url(#gradient4)"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 1.6 }}
                />
                
                {/* Gradients */}
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8246F1" />
                    <stop offset="100%" stopColor="#00E3E3" />
                  </linearGradient>
                  <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8246F1" />
                    <stop offset="100%" stopColor="#FF784A" />
                  </linearGradient>
                  <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00E3E3" />
                    <stop offset="100%" stopColor="#FF784A" />
                  </linearGradient>
                  <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FF784A" />
                    <stop offset="100%" stopColor="#8246F1" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Workflow Nodes */}
              {workflowNodes.map((node, index) => (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.2 }}
                  className="absolute workflow-node text-center cursor-pointer hover:scale-105 transition-transform duration-200"
                  style={{
                    left: `${node.position.x}px`,
                    top: `${node.position.y}px`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: 2
                  }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-neon-purple/30 to-neon-blue/30 rounded-xl flex items-center justify-center mb-2 border border-neon-purple/50">
                    <ApperIcon 
                      name={node.icon} 
                      size={24} 
                      className={`${
                        index % 3 === 0 ? 'text-neon-purple' :
                        index % 3 === 1 ? 'text-neon-blue' : 'text-neon-orange'
                      }`} 
                    />
                  </div>
                  <span className="text-xs text-gray-300 font-medium">{node.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button size="xl" className="gradient-button text-white font-semibold px-8 py-4 text-lg neon-glow">
            <ApperIcon name="Zap" size={20} className="mr-2" />
            Build Your First Flow
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default WorkflowPreview;