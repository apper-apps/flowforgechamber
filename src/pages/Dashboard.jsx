import { useState } from "react";
import { Link } from "react-router-dom";
import { useWorkflows } from "@/hooks/useWorkflows";
import Button from "@/components/atoms/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import WorkflowCard from "@/components/molecules/WorkflowCard";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { format } from "date-fns";

const Dashboard = () => {
  const { workflows, loading, error, loadWorkflows, deleteWorkflow } = useWorkflows();
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);

  const handleDownload = (workflow) => {
    try {
      const dataStr = JSON.stringify(workflow.jsonContent, null, 2);
      const dataBlob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${workflow.title.toLowerCase().replace(/\s+/g, "-")}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success("Workflow downloaded successfully!");
    } catch (error) {
      toast.error("Failed to download workflow");
    }
  };

  const handleViewInstructions = (workflow) => {
    setSelectedWorkflow(workflow);
  };

  const handleDelete = async (workflowId) => {
    if (window.confirm("Are you sure you want to delete this workflow?")) {
      try {
        await deleteWorkflow(workflowId);
        toast.success("Workflow deleted successfully");
      } catch (error) {
        toast.error("Failed to delete workflow");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Loading />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Error message={error} onRetry={loadWorkflows} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold font-display text-slate-900">
                Welcome back! 👋
              </h1>
              <p className="text-lg text-slate-600 mt-2">
                Manage your AI-generated workflows and create new automation solutions.
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Link to="/create">
                <Button size="lg">
                  <ApperIcon name="Plus" size={20} className="mr-2" />
                  Create New Workflow
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid sm:grid-cols-3 gap-6 mb-8"
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Workflows</p>
                  <p className="text-3xl font-bold gradient-text">{workflows.length}</p>
                </div>
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <ApperIcon name="Workflow" size={24} className="text-primary-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">This Month</p>
                  <p className="text-3xl font-bold gradient-text">
                    {workflows.filter(w => {
                      const workflowDate = new Date(w.createdAt);
                      const now = new Date();
                      return workflowDate.getMonth() === now.getMonth() && 
                             workflowDate.getFullYear() === now.getFullYear();
                    }).length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
                  <ApperIcon name="TrendingUp" size={24} className="text-accent-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Plan Status</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="success">Free Plan</Badge>
                    <span className="text-sm text-slate-500">2/3 used</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <ApperIcon name="Crown" size={24} className="text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Workflows Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-slate-900">Your Workflows</h2>
            <Button variant="outline" size="sm">
              <ApperIcon name="Filter" size={16} className="mr-2" />
              Filter
            </Button>
          </div>

          {workflows.length === 0 ? (
            <Empty
              title="No workflows yet"
              description="Create your first AI-generated n8n workflow to get started with automation."
              actionLabel="Create Your First Workflow"
              onAction={() => window.location.href = "/create"}
              icon="Workflow"
            />
          ) : (
            <div className="grid gap-6">
              {workflows.map((workflow, index) => (
                <motion.div
                  key={workflow.Id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <WorkflowCard
                    workflow={workflow}
                    onDownload={handleDownload}
                    onViewInstructions={handleViewInstructions}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Instructions Modal */}
        {selectedWorkflow && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b">
                <h3 className="text-xl font-semibold text-slate-900">
                  Setup Instructions
                </h3>
                <button
                  onClick={() => setSelectedWorkflow(null)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <ApperIcon name="X" size={20} className="text-slate-500" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto">
                <h4 className="font-semibold text-slate-900 mb-4">
                  {selectedWorkflow.title}
                </h4>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <pre className="whitespace-pre-wrap text-sm text-slate-700 font-mono">
                    {selectedWorkflow.instructions}
                  </pre>
                </div>
                <div className="flex gap-3 mt-6">
                  <Button onClick={() => handleDownload(selectedWorkflow)}>
                    <ApperIcon name="Download" size={16} className="mr-2" />
                    Download JSON
                  </Button>
                  <Button variant="outline" onClick={() => setSelectedWorkflow(null)}>
                    Close
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;