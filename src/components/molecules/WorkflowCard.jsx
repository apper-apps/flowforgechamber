import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import { format } from "date-fns";

const WorkflowCard = ({ workflow, onDownload, onViewInstructions }) => {
  return (
    <Card className="hover:shadow-lg transition-all duration-200">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-base font-semibold text-slate-900 line-clamp-2">
            {workflow.title}
          </CardTitle>
          <Badge variant="success" className="ml-2">
            Ready
          </Badge>
        </div>
        <p className="text-sm text-slate-600 line-clamp-2">{workflow.description}</p>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-500">
            {format(new Date(workflow.createdAt), "MMM d, yyyy")}
          </span>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="ghost"
              onClick={() => onViewInstructions(workflow)}
            >
              <ApperIcon name="Eye" size={16} className="mr-1" />
              View
            </Button>
            <Button 
              size="sm"
              onClick={() => onDownload(workflow)}
            >
              <ApperIcon name="Download" size={16} className="mr-1" />
              Download
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkflowCard;