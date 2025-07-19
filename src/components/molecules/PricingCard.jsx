import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const PricingCard = ({ plan, isPopular = false, onSelect }) => {
  return (
    <Card className={`relative ${isPopular ? "ring-2 ring-primary-500 scale-105" : ""}`}>
      {isPopular && (
        <Badge variant="default" className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          Most Popular
        </Badge>
      )}
      <CardHeader>
        <CardTitle className="text-center">
          <div className="text-lg font-semibold text-slate-900">{plan.name}</div>
          <div className="mt-2">
            <span className="text-3xl font-bold gradient-text">${plan.price}</span>
            <span className="text-slate-600">/month</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <ul className="space-y-3">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <ApperIcon name="Check" size={16} className="text-accent-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-slate-600">{feature}</span>
            </li>
          ))}
        </ul>
        <Button 
          className="w-full" 
          variant={isPopular ? "default" : "outline"}
          onClick={() => onSelect(plan)}
        >
          Get Started
        </Button>
      </CardContent>
    </Card>
  );
};

export default PricingCard;