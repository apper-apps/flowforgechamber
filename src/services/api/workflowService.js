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

async generateWorkflow(formData) {
    await delay(2000); // Simulate AI processing time
    
    // Generate a new workflow based on the form data
    const newId = Math.max(...this.workflows.map(w => w.Id), 0) + 1;
    const title = formData.workflow_name;
    const description = this.generateDescription(formData);
    
    const workflow = {
      Id: newId,
      title,
      description,
      jsonContent: this.generateMockWorkflow(formData),
      instructions: this.generateInstructions(formData),
      createdAt: new Date().toISOString(),
      userId: "user-1"
    };

    this.workflows.unshift(workflow);
    return { ...workflow };
  }

  generateDescription(formData) {
    const triggerLabels = {
      webhook: "webhook trigger",
      gmail: "new Gmail email",
      google_sheets: "new Google Sheets row",
      airtable: "new Airtable record",
      cron: "scheduled trigger",
      manual: "manual trigger"
    };

    const actionLabels = {
      slack_message: "send Slack message",
      send_email: "send email",
      google_sheets_row: "add Google Sheets row",
      http_request: "make HTTP request",
      notion_page: "create Notion page",
      filter_condition: "apply filter/condition",
      wait_delay: "add wait/delay"
    };

    const trigger = triggerLabels[formData.trigger_type] || "trigger";
    const actions = formData.action_nodes.map(a => actionLabels[a] || a).join(", ");
    
    return `Workflow that starts with ${trigger} and performs: ${actions}`;
  }

generateMockWorkflow(formData) {
    const nodes = [
      {
        parameters: {},
        name: "Start",
        type: "n8n-nodes-base.start",
        typeVersion: 1,
        position: [240, 300]
      }
    ];

    let xPosition = 460;
    let lastNodeName = "Start";
    const connections = {};

    // Add trigger node
    const triggerNode = this.getTriggerNode(formData.trigger_type, xPosition);
    nodes.push(triggerNode);
    
    connections[lastNodeName] = {
      main: [[{ node: triggerNode.name, type: "main", index: 0 }]]
    };
    lastNodeName = triggerNode.name;
    xPosition += 220;

    // Add action nodes
    formData.action_nodes.forEach((action, index) => {
      const actionNode = this.getActionNode(action, xPosition, index);
      nodes.push(actionNode);
      
      connections[lastNodeName] = {
        main: [[{ node: actionNode.name, type: "main", index: 0 }]]
      };
      lastNodeName = actionNode.name;
      xPosition += 220;
    });

    return {
      name: formData.workflow_name,
      nodes,
      connections
    };
  }

  getTriggerNode(triggerType, xPosition) {
    const triggerNodes = {
      webhook: {
        parameters: { httpMethod: "POST", path: "/webhook" },
        name: "Webhook",
        type: "n8n-nodes-base.webhook",
        typeVersion: 1,
        position: [xPosition, 300]
      },
      gmail: {
        parameters: { pollTimes: { item: [{ mode: "everyMinute", value: 5 }] } },
        name: "Gmail Trigger",
        type: "n8n-nodes-base.gmailTrigger",
        typeVersion: 1,
        position: [xPosition, 300]
      },
      google_sheets: {
        parameters: { sheetId: "YOUR_SHEET_ID" },
        name: "Google Sheets Trigger",
        type: "n8n-nodes-base.googleSheetsTrigger",
        typeVersion: 1,
        position: [xPosition, 300]
      },
      airtable: {
        parameters: { baseId: "YOUR_BASE_ID", tableId: "YOUR_TABLE_ID" },
        name: "Airtable Trigger",
        type: "n8n-nodes-base.airtableTrigger",
        typeVersion: 1,
        position: [xPosition, 300]
      },
      cron: {
        parameters: { triggerTimes: { item: [{ hour: 9, minute: 0 }] } },
        name: "Cron",
        type: "n8n-nodes-base.cron",
        typeVersion: 1,
        position: [xPosition, 300]
      },
      manual: {
        parameters: {},
        name: "Manual Trigger",
        type: "n8n-nodes-base.manualTrigger",
        typeVersion: 1,
        position: [xPosition, 300]
      }
    };

    return triggerNodes[triggerType] || triggerNodes.manual;
  }

  getActionNode(actionType, xPosition, index) {
    const actionNodes = {
      slack_message: {
        parameters: { channel: "#general", text: "Workflow triggered!" },
        name: `Slack${index > 0 ? ` ${index + 1}` : ''}`,
        type: "n8n-nodes-base.slack",
        typeVersion: 1,
        position: [xPosition, 300]
      },
      send_email: {
        parameters: { toEmail: "recipient@example.com", subject: "Workflow Notification" },
        name: `Email${index > 0 ? ` ${index + 1}` : ''}`,
        type: "n8n-nodes-base.emailSend",
        typeVersion: 1,
        position: [xPosition, 300]
      },
      google_sheets_row: {
        parameters: { sheetId: "YOUR_SHEET_ID", range: "A:Z" },
        name: `Google Sheets${index > 0 ? ` ${index + 1}` : ''}`,
        type: "n8n-nodes-base.googleSheets",
        typeVersion: 1,
        position: [xPosition, 300]
      },
      http_request: {
        parameters: { url: "https://api.example.com/webhook", method: "POST" },
        name: `HTTP Request${index > 0 ? ` ${index + 1}` : ''}`,
        type: "n8n-nodes-base.httpRequest",
        typeVersion: 1,
        position: [xPosition, 300]
      },
      notion_page: {
        parameters: { databaseId: "YOUR_DATABASE_ID" },
        name: `Notion${index > 0 ? ` ${index + 1}` : ''}`,
        type: "n8n-nodes-base.notion",
        typeVersion: 1,
        position: [xPosition, 300]
      },
      filter_condition: {
        parameters: { conditions: { number: [{ value1: "{{ $json.value }}", operation: "larger", value2: 0 }] } },
        name: `IF${index > 0 ? ` ${index + 1}` : ''}`,
        type: "n8n-nodes-base.if",
        typeVersion: 1,
        position: [xPosition, 300]
      },
      wait_delay: {
        parameters: { amount: 5, unit: "minutes" },
        name: `Wait${index > 0 ? ` ${index + 1}` : ''}`,
        type: "n8n-nodes-base.wait",
        typeVersion: 1,
        position: [xPosition, 300]
      }
    };

    return actionNodes[actionType] || actionNodes.http_request;
  }

generateInstructions(formData) {
    const triggerInstructions = {
      webhook: "Configure the webhook URL in your external service",
      gmail: "Set up Gmail credentials and configure email filters",
      google_sheets: "Connect your Google Sheets account and specify the sheet ID",
      airtable: "Configure Airtable credentials and specify base/table IDs",
      cron: "Adjust the schedule timing as needed",
      manual: "This workflow can be triggered manually from the n8n interface"
    };

    const actionInstructions = formData.action_nodes.map(action => {
      const instructions = {
        slack_message: "Set up Slack credentials and configure the target channel",
        send_email: "Configure email credentials and update recipient addresses",
        google_sheets_row: "Connect Google Sheets and specify the target sheet",
        http_request: "Update the API endpoint URL and configure authentication",
        notion_page: "Set up Notion integration and specify the database ID",
        filter_condition: "Customize the condition logic for your data",
        wait_delay: "Adjust the wait time as needed for your workflow"
      };
      return instructions[action] || "Configure this action according to your requirements";
    }).join('\n• ');

    return `Setup Instructions:

1. Import this workflow into your n8n instance
2. Trigger Setup: ${triggerInstructions[formData.trigger_type]}
3. Action Configuration:
• ${actionInstructions}
4. Test the workflow with sample data
5. Activate the workflow to start processing

Workflow: "${formData.workflow_name}"
Trigger: ${formData.trigger_type}
Actions: ${formData.action_nodes.join(', ')}

Please review and customize all nodes according to your specific requirements.`;
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