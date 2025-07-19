import { useState } from "react";
import { motion } from "framer-motion";
import WorkflowForm from "@/components/organisms/WorkflowForm";
import WorkflowResult from "@/components/organisms/WorkflowResult";

const WorkflowCreator = () => {
  const [generatedWorkflow, setGeneratedWorkflow] = useState(null);

  const handleWorkflowGenerated = (workflow) => {
    setGeneratedWorkflow(workflow);
  };

  const handleStartNew = () => {
    setGeneratedWorkflow(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-3xl sm:text-4xl font-bold font-display text-slate-900 mb-4">
            AI Workflow <span className="gradient-text">Generator</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Transform your automation ideas into ready-to-use n8n workflows with the power of AI.
          </p>
        </motion.div>

        {!generatedWorkflow ? (
          <WorkflowForm onWorkflowGenerated={handleWorkflowGenerated} />
        ) : (
          <WorkflowResult workflow={generatedWorkflow} onStartNew={handleStartNew} />
        )}
      </div>
    </div>
  );
};

export default WorkflowCreator;