import workflowsData from "@/services/mockData/workflows.json";

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class WorkflowService {
  constructor() {
    this.workflows = [...workflowsData];
  }

  async getAll() {
    await delay(300);
    return [...this.workflows];
  }

  async getById(id) {
    await delay(200);
    const workflow = this.workflows.find(w => w.Id === parseInt(id));
    if (!workflow) {
      throw new Error("Workflow not found");
    }
    return { ...workflow };
  }

  async generateWorkflow(description) {
    await delay(2000); // Simulate AI processing time
    
    // Generate a new workflow based on the description
    const newId = Math.max(...this.workflows.map(w => w.Id), 0) + 1;
    const title = this.generateTitle(description);
    
    const workflow = {
      Id: newId,
      title,
      description,
      jsonContent: this.generateMockWorkflow(description),
      instructions: this.generateInstructions(description),
      createdAt: new Date().toISOString(),
      userId: "user-1"
    };

    this.workflows.unshift(workflow);
    return { ...workflow };
  }

  generateTitle(description) {
    // Simple title generation based on keywords
    if (description.toLowerCase().includes("slack")) {
      return "Slack Integration Workflow";
    } else if (description.toLowerCase().includes("email")) {
      return "Email Automation Workflow";
    } else if (description.toLowerCase().includes("form")) {
      return "Form Processing Workflow";
    } else if (description.toLowerCase().includes("twitter")) {
      return "Twitter Automation Workflow";
    } else if (description.toLowerCase().includes("website")) {
      return "Website Monitoring Workflow";
    } else {
      return "Custom Automation Workflow";
    }
  }

  generateMockWorkflow(description) {
    // Generate a basic n8n workflow structure
    return {
      name: this.generateTitle(description),
      nodes: [
        {
          parameters: {},
          name: "Start",
          type: "n8n-nodes-base.start",
          typeVersion: 1,
          position: [240, 300]
        },
        {
          parameters: {
            httpMethod: "GET",
            path: "/webhook"
          },
          name: "Webhook",
          type: "n8n-nodes-base.webhook",
          typeVersion: 1,
          position: [460, 300]
        },
        {
          parameters: {
            values: {
              string: [
                {
                  name: "processed",
                  value: "true"
                }
              ]
            }
          },
          name: "Set",
          type: "n8n-nodes-base.set",
          typeVersion: 1,
          position: [680, 300]
        }
      ],
      connections: {
        "Start": {
          main: [
            [
              {
                node: "Webhook",
                type: "main",
                index: 0
              }
            ]
          ]
        },
        "Webhook": {
          main: [
            [
              {
                node: "Set",
                type: "main",
                index: 0
              }
            ]
          ]
        }
      }
    };
  }

  generateInstructions(description) {
    return `1. Import this workflow into your n8n instance
2. Configure the webhook URL in your trigger service
3. Set up any required credentials for external services
4. Test the workflow with sample data
5. Activate the workflow to start processing

Note: This workflow was generated based on: "${description}"
Please review and customize the nodes according to your specific requirements.`;
  }

  async delete(id) {
    await delay(200);
    const index = this.workflows.findIndex(w => w.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Workflow not found");
    }
    this.workflows.splice(index, 1);
    return true;
  }
}

export const workflowService = new WorkflowService();