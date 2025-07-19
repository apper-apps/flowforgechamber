import { useEffect, useState } from "react";
import { useSearchParams, useLocation, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const PurchaseSuccess = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const orderId = searchParams.get("order");
  const { order, template } = location.state || {};

  const [downloadStarted, setDownloadStarted] = useState(false);

  useEffect(() => {
    // Simulate confetti or celebration animation
    const timer = setTimeout(() => {
      // Auto-start download after a delay
      if (!downloadStarted) {
        handleDownload();
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [downloadStarted]);

  const handleDownload = () => {
    setDownloadStarted(true);
    // Simulate file download
    const link = document.createElement('a');
    link.href = order?.downloadUrl || '#';
    link.download = `${template?.name || 'template'}.json`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <ApperIcon name="Check" size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Purchase Successful!
          </h1>
          <p className="text-slate-600">
            Thank you for your purchase. Your template is ready for download.
          </p>
        </div>

        {/* Order Details */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <ApperIcon name="Receipt" size={20} className="mr-2" />
              Order Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            {order && template ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg">
                  <img
                    src={template.image}
                    alt={template.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900">{template.name}</h3>
                    <p className="text-sm text-slate-600">by {template.author}</p>
                    <p className="text-sm text-slate-500">{template.category}</p>
                  </div>
                  <span className="font-semibold text-lg">${template.price}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-500">Order ID:</span>
                    <p className="font-medium">{order.Id}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Purchase Date:</span>
                    <p className="font-medium">{new Date(order.purchaseDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Status:</span>
                    <p className="font-medium text-accent-600 capitalize">{order.status}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Total:</span>
                    <p className="font-medium">${(template.price * 1.08).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-slate-500">Order information not available</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Download Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <ApperIcon name="Download" size={20} className="mr-2" />
              Download Your Template
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <p className="text-slate-600">
                Your n8n automation template is ready for download. Click the button below to get started.
              </p>
              
              <Button
                onClick={handleDownload}
                className="gradient-button"
                size="lg"
                disabled={!order}
              >
                <ApperIcon name="Download" size={20} className="mr-2" />
                {downloadStarted ? "Download Started" : "Download Template"}
              </Button>
              
              {downloadStarted && (
                <p className="text-sm text-accent-600 flex items-center justify-center">
                  <ApperIcon name="Check" size={16} className="mr-1" />
                  Download started successfully
                </p>
              )}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center">
                <ApperIcon name="Info" size={16} className="mr-2" />
                Next Steps:
              </h4>
              <ol className="text-sm space-y-1 list-decimal list-inside">
                <li>Import the template into your n8n instance</li>
                <li>Follow the included setup documentation</li>
                <li>Configure the required integrations</li>
                <li>Test the workflow with sample data</li>
                <li>Deploy and start automating!</li>
              </ol>
            </div>
          </CardContent>
        </Card>

        {/* Support & Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-slate-600">
                If you need assistance setting up your template or have any questions, we're here to help.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/marketplace">
                  <Button variant="outline" className="w-full sm:w-auto">
                    <ApperIcon name="ArrowLeft" size={16} className="mr-2" />
                    Back to Marketplace
                  </Button>
                </Link>
                
                <Button variant="outline" className="w-full sm:w-auto">
                  <ApperIcon name="HelpCircle" size={16} className="mr-2" />
                  Get Support
                </Button>
                
                <Button variant="outline" className="w-full sm:w-auto">
                  <ApperIcon name="Mail" size={16} className="mr-2" />
                  Email Receipt
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer Message */}
        <div className="text-center mt-8 text-slate-500">
          <p className="flex items-center justify-center">
            <ApperIcon name="Heart" size={16} className="mr-1" />
            Thank you for choosing our automation templates!
          </p>
        </div>
      </div>
    </div>
  );
};

export default PurchaseSuccess;