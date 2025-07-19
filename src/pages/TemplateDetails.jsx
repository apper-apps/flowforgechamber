import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { templateService } from "@/services/api/templateService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";
import { toast } from "react-toastify";

const TemplateDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTemplate();
  }, [id]);

  const loadTemplate = async () => {
    try {
      setLoading(true);
      const templateData = await templateService.getById(id);
      setTemplate(templateData);
      setError(null);
    } catch (err) {
      setError("Failed to load template details");
      toast.error("Template not found");
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner":
        return "success";
      case "Intermediate":
        return "warning";
      case "Advanced":
        return "error";
      default:
        return "default";
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadTemplate} />;
  if (!template) return <Error message="Template not found" />;

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex items-center space-x-2 text-sm text-slate-600">
            <Link to="/marketplace" className="hover:text-primary-600 transition-colors">
              Marketplace
            </Link>
            <ApperIcon name="ChevronRight" size={16} />
            <span className="text-slate-900">{template.name}</span>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <img
                  src={template.image}
                  alt={template.name}
                  className="w-full sm:w-48 h-48 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <h1 className="text-3xl font-bold text-slate-900">
                      {template.name}
                    </h1>
                    <Badge variant={getDifficultyColor(template.difficulty)}>
                      {template.difficulty}
                    </Badge>
                  </div>
                  
                  <p className="text-slate-600 mb-4">{template.description}</p>
                  
                  <div className="flex items-center gap-6 text-sm text-slate-500 mb-4">
                    <div className="flex items-center">
                      <ApperIcon name="Star" size={16} className="text-yellow-400 mr-1" />
                      <span>{template.rating} rating</span>
                    </div>
                    <div className="flex items-center">
                      <ApperIcon name="Download" size={16} className="mr-1" />
                      <span>{template.downloads} downloads</span>
                    </div>
                    <div className="flex items-center">
                      <ApperIcon name="Clock" size={16} className="mr-1" />
                      <span>{template.estimatedSetupTime} setup</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-500">by {template.author}</p>
                      <p className="text-sm text-slate-500">{template.category}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-3xl font-bold text-primary-600">
                        ${template.price}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ApperIcon name="Zap" size={20} className="mr-2" />
                  Features Included
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {template.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <ApperIcon name="Check" size={16} className="text-accent-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ApperIcon name="Settings" size={20} className="mr-2" />
                  Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {template.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start">
                      <ApperIcon name="Dot" size={16} className="text-slate-400 mr-2 mt-0.5" />
                      <span className="text-slate-700">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ApperIcon name="Tag" size={20} className="mr-2" />
                  Tags
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {template.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Purchase Card */}
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-center">
                  Purchase Template
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <span className="text-4xl font-bold text-primary-600">
                    ${template.price}
                  </span>
                  <p className="text-sm text-slate-500 mt-1">One-time purchase</p>
                </div>
                
                <Link to={`/checkout?template=${template.Id}`}>
                  <Button className="w-full gradient-button" size="lg">
                    <ApperIcon name="ShoppingCart" size={20} className="mr-2" />
                    Buy Now
                  </Button>
                </Link>
                
                <div className="text-center text-sm text-slate-500 space-y-1">
                  <p>✓ Instant download</p>
                  <p>✓ Full documentation included</p>
                  <p>✓ 30-day money-back guarantee</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Info */}
            <Card>
              <CardHeader>
                <CardTitle>Template Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">Category:</span>
                  <span className="font-medium">{template.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Difficulty:</span>
                  <Badge variant={getDifficultyColor(template.difficulty)} className="text-xs">
                    {template.difficulty}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Setup Time:</span>
                  <span className="font-medium">{template.estimatedSetupTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Downloads:</span>
                  <span className="font-medium">{template.downloads}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Rating:</span>
                  <div className="flex items-center">
                    <ApperIcon name="Star" size={16} className="text-yellow-400 mr-1" />
                    <span className="font-medium">{template.rating}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateDetails;