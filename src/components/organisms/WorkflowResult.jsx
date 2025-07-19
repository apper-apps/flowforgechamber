import { useState } from "react";
import Button from "@/components/atoms/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const WorkflowResult = ({ workflow, onStartNew }) => {
  const [showInstructions, setShowInstructions] = useState(false);

  const handleDownload = () => {
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
      console.error("Download error:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      {/* Success Banner */}
      <Card className="bg-gradient-to-r from-accent-50 to-primary-50 border-accent-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-accent-500 rounded-full flex items-center justify-center">
              <ApperIcon name="CheckCircle" size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Workflow Generated Successfully!</h3>
              <p className="text-slate-600">Your n8n workflow is ready to download and use.</p>
            </div>
            <Badge variant="success" className="ml-auto">
              Ready
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Workflow Details */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xl font-bold text-slate-900 mb-2">
                {workflow.title}
              </CardTitle>
              <p className="text-slate-600">{workflow.description}</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowInstructions(!showInstructions)}
              >
                <ApperIcon name="FileText" size={16} className="mr-2" />
                {showInstructions ? "Hide" : "View"} Instructions
              </Button>
              <Button onClick={handleDownload}>
                <ApperIcon name="Download" size={16} className="mr-2" />
                Download JSON
              </Button>
            </div>
          </div>
        </CardHeader>

        {showInstructions && (
          <CardContent className="border-t">
            <div className="prose max-w-none">
              <h4 className="text-lg font-semibold text-slate-900 mb-4">Setup Instructions</h4>
              <div className="bg-slate-50 p-4 rounded-lg">
                <pre className="whitespace-pre-wrap text-sm text-slate-700 font-mono">
                  {workflow.instructions}
                </pre>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={onStartNew} variant="outline" size="lg">
          <ApperIcon name="Plus" size={20} className="mr-2" />
          Create Another Workflow
        </Button>
        <Button variant="secondary" size="lg">
          <ApperIcon name="ExternalLink" size={20} className="mr-2" />
          Open n8n Documentation
        </Button>
      </div>

      {/* Next Steps */}
      <Card className="bg-slate-50">
        <CardContent className="p-6">
          <h4 className="text-lg font-semibold text-slate-900 mb-4">Next Steps</h4>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-semibold text-primary-600">1</span>
              </div>
              <div>
                <p className="font-medium text-slate-900">Download the JSON file</p>
                <p className="text-sm text-slate-600">Click the download button above to save your workflow</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-semibold text-primary-600">2</span>
              </div>
              <div>
                <p className="font-medium text-slate-900">Import into n8n</p>
                <p className="text-sm text-slate-600">Open n8n and use the import feature to load your workflow</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-semibold text-primary-600">3</span>
              </div>
              <div>
                <p className="font-medium text-slate-900">Configure and activate</p>
                <p className="text-sm text-slate-600">Follow the setup instructions to connect your services</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default WorkflowResult;