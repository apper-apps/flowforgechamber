import { motion } from "framer-motion";
import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const CodeVsNoCode = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-dark-surface/50 to-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold font-display text-white mb-4">
              Code when you <span className="gradient-text">need</span> it.
              <br />UI when you <span className="gradient-text-orange">don't</span>.
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The flexibility to work however you prefer, with the power to combine both approaches
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Code Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="premium-card-glow p-8"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 rounded-lg flex items-center justify-center border border-neon-blue/30">
                <ApperIcon name="Code" size={20} className="text-neon-blue" />
              </div>
              <h3 className="text-xl font-semibold text-white">For Developers</h3>
            </div>
            
<div className="bg-dark-bg/60 p-4 rounded-lg border border-neon-blue/30 mb-6 font-mono text-sm">
              <div className="text-neon-blue mb-2">// Paste curl requests</div>
              <div className="text-gray-300">curl -X POST \</div>
              <div className="text-gray-300 ml-2">-H "Content-Type: application/json" \</div>
              <div className="text-gray-300 ml-2">-d '{"key": "value"}' \</div>
              <div className="text-gray-300 ml-2">https://api.example.com/data</div>
              <br />
              <div className="text-neon-orange">// Custom JavaScript functions</div>
              <div className="text-gray-300">return items.filter(item =&gt; </div>
              <div className="text-gray-300 ml-2">item.status === 'active'</div>
              <div className="text-gray-300">);</div>
            </div>
          </motion.div>

          {/* Visual Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="premium-card-glow p-8"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-neon-orange/20 to-neon-purple/20 rounded-lg flex items-center justify-center border border-neon-orange/30">
                <ApperIcon name="MousePointer" size={20} className="text-neon-orange" />
              </div>
              <h3 className="text-xl font-semibold text-white">Visual Builder</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-neon-orange/20 to-neon-purple/20 rounded-lg flex items-center justify-center border border-neon-orange/30">
                  <ApperIcon name="MousePointer" size={20} className="text-neon-orange" />
                </div>
                <div className="text-white">Drag & drop nodes</div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-neon-purple/20 to-neon-blue/20 rounded-lg flex items-center justify-center border border-neon-purple/30">
                  <ApperIcon name="RotateCcw" size={20} className="text-neon-purple" />
                </div>
                <div className="text-white">Combine loops, filters, APIs</div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-neon-blue/20 to-neon-orange/20 rounded-lg flex items-center justify-center border border-neon-blue/30">
                  <ApperIcon name="GitBranch" size={20} className="text-neon-blue" />
                </div>
                <div className="text-white">Visual condition branches</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Feature List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center space-x-2 text-gray-300">
              <ApperIcon name="Check" size={16} className="text-neon-blue" />
              <span>Paste curl requests</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-300">
              <ApperIcon name="Check" size={16} className="text-neon-purple" />
              <span>Drag & drop nodes</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-300">
              <ApperIcon name="Check" size={16} className="text-neon-orange" />
              <span>Combine loops, filters, APIs</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CodeVsNoCode;