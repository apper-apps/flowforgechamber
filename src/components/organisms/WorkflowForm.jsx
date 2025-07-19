import { useState } from "react";
import Button from "@/components/atoms/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import { workflowService } from "@/services/api/workflowService";
import { toast } from "react-toastify";

const WorkflowForm = ({ onWorkflowGenerated }) => {
  const [description, setDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim()) {
      toast.error("Please describe your workflow");
      return;
    }

    setIsGenerating(true);
    try {
      const workflow = await workflowService.generateWorkflow(description);
      onWorkflowGenerated(workflow);
      setDescription("");
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
          What Should Your Workflow Do?
        </CardTitle>
        <p className="text-center text-slate-600">
          Describe your automation idea in plain English, and we'll create a ready-to-use n8n workflow for you.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Example: Send me a Slack message when someone fills out a Google Form..."
              className="w-full h-32 p-4 border border-slate-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              disabled={isGenerating}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              type="submit"
              size="lg"
              className="flex-1"
              disabled={isGenerating || !description.trim()}
            >
              {isGenerating ? (
                <>
                  <Loading type="spinner" className="mr-2 h-5 w-5" />
                  Generating Workflow...
                </>
              ) : (
                <>
                  <ApperIcon name="Sparkles" size={20} className="mr-2" />
                  Generate Workflow
                </>
              )}
            </Button>
            
            <Button
              type="button"
              variant="outline"
              size="lg"
              disabled={isGenerating}
            >
              <ApperIcon name="Mic" size={20} className="mr-2" />
              Voice Input
            </Button>
          </div>
        </form>

        {/* Example prompts */}
        <div className="mt-8 p-4 bg-slate-50 rounded-lg">
          <h4 className="text-sm font-semibold text-slate-700 mb-3">Try these examples:</h4>
          <div className="space-y-2">
            {[
              "Send me an email when my website goes down",
              "Post new RSS feed items to Twitter automatically",
              "Create a Trello card when I receive a specific email",
              "Send customer data from TypeForm to my CRM"
            ].map((example, index) => (
              <button
                key={index}
                onClick={() => setDescription(example)}
                className="block text-left text-sm text-slate-600 hover:text-primary-600 transition-colors"
                disabled={isGenerating}
              >
                "{example}"
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkflowForm;