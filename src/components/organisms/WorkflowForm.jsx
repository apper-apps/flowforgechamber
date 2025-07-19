import { useState } from "react";
import Button from "@/components/atoms/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";
import FormField from "@/components/molecules/FormField";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import { workflowService } from "@/services/api/workflowService";
import { toast } from "react-toastify";

const WorkflowForm = ({ onWorkflowGenerated }) => {
  const [triggerType, setTriggerType] = useState("");
  const [actionNodes, setActionNodes] = useState([]);
  const [workflowName, setWorkflowName] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const triggerOptions = [
    { value: "webhook", label: "Webhook" },
    { value: "gmail", label: "New email in Gmail" },
    { value: "google_sheets", label: "New row in Google Sheets" },
    { value: "airtable", label: "New record in Airtable" },
    { value: "cron", label: "Cron (on a schedule)" },
    { value: "manual", label: "Manual trigger" }
  ];

  const actionOptions = [
    { value: "slack_message", label: "Send Slack message" },
    { value: "send_email", label: "Send email" },
    { value: "google_sheets_row", label: "Add a Google Sheets row" },
    { value: "http_request", label: "HTTP Request" },
    { value: "notion_page", label: "Create Notion page" },
    { value: "filter_condition", label: "Filter or Condition" },
    { value: "wait_delay", label: "Wait/Delay" }
  ];

  const handleActionToggle = (actionValue) => {
    setActionNodes(prev => 
      prev.includes(actionValue)
        ? prev.filter(a => a !== actionValue)
        : [...prev, actionValue]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
if (!triggerType) {
      toast.error("Please select when the workflow should start");
      return;
    }
    if (actionNodes.length === 0) {
      toast.error("Please select at least one action");
      return;
    }
    if (!workflowName.trim()) {
      toast.error("Please enter a workflow name");
      return;
    }

    const formData = {
      trigger_type: triggerType,
      action_nodes: actionNodes,
      workflow_name: workflowName.trim()
    };

    setIsGenerating(true);
    try {
      const workflow = await workflowService.generateWorkflow(formData);
      onWorkflowGenerated(workflow);
      setTriggerType("");
      setActionNodes([]);
      setWorkflowName("");
      toast.success("Workflow generated successfully!");
    } catch (error) {
      toast.error("Failed to generate workflow. Please try again.");
      console.error("Generation error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center gradient-text">
          Create Workflow
        </CardTitle>
        <p className="text-center text-slate-600">
          Build your automation workflow using our guided form. Select triggers and actions to generate a ready-to-use n8n workflow.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Trigger Selection */}
          <FormField label="When should the workflow start?">
            <select
              value={triggerType}
              onChange={(e) => setTriggerType(e.target.value)}
              className="w-full h-10 px-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isGenerating}
            >
              <option value="">Select a trigger...</option>
              {triggerOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </FormField>

          {/* Action Selection */}
          <FormField label="What actions should happen?">
            <div className="space-y-2 p-4 border border-slate-300 rounded-lg">
              {actionOptions.map(action => (
                <label key={action.value} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={actionNodes.includes(action.value)}
                    onChange={() => handleActionToggle(action.value)}
                    disabled={isGenerating}
                    className="rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-slate-700">{action.label}</span>
                </label>
              ))}
            </div>
          </FormField>

          {/* Workflow Name */}
          <FormField label="Workflow name">
            <input
              type="text"
              value={workflowName}
              onChange={(e) => setWorkflowName(e.target.value)}
              placeholder="Enter a name for your workflow..."
              className="w-full h-10 px-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isGenerating}
            />
          </FormField>

<div className="flex justify-center">
            <Button
              type="submit"
              size="lg"
              className="px-8"
              disabled={isGenerating || !triggerType || actionNodes.length === 0 || !workflowName.trim()}
            >
              {isGenerating ? (
                <>
                  <Loading type="spinner" className="mr-2 h-5 w-5" />
                  Generating Workflow...
                </>
              ) : (
                <>
                  <ApperIcon name="Sparkles" size={20} className="mr-2" />
                  Generate My Workflow
                </>
              )}
            </Button>
</div>
        </form>

        {/* Quick Setup Examples */}
        <div className="mt-8 p-4 bg-slate-50 rounded-lg">
          <h4 className="text-sm font-semibold text-slate-700 mb-3">Popular workflow combinations:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="text-sm text-slate-600">
              <strong>Gmail → Slack:</strong> New email notifications
            </div>
            <div className="text-sm text-slate-600">
              <strong>Google Sheets → Email:</strong> Row update alerts
            </div>
            <div className="text-sm text-slate-600">
              <strong>Webhook → HTTP Request:</strong> API integrations
            </div>
            <div className="text-sm text-slate-600">
              <strong>Cron → Multiple Actions:</strong> Scheduled tasks
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkflowForm;