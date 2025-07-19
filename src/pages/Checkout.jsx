import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { templateService } from "@/services/api/templateService";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";
import { toast } from "react-toastify";

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const templateId = searchParams.get("template");

  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.name?.split(" ")[0] || "",
    lastName: user?.name?.split(" ")[1] || "",
    email: user?.email || "",
    company: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    billingAddress: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "US"
    }
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (!templateId) {
      navigate("/marketplace");
      return;
    }
    loadTemplate();
  }, [templateId]);

  const loadTemplate = async () => {
    try {
      setLoading(true);
      const templateData = await templateService.getById(templateId);
      setTemplate(templateData);
      setError(null);
    } catch (err) {
      setError("Failed to load template details");
      toast.error("Template not found");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }

    // Clear error for this field
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    // Basic info validation
    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Invalid email format";

    // Payment validation
    if (!formData.cardNumber.trim()) errors.cardNumber = "Card number is required";
    else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ""))) {
      errors.cardNumber = "Card number must be 16 digits";
    }

    if (!formData.expiryDate.trim()) errors.expiryDate = "Expiry date is required";
    else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
      errors.expiryDate = "Invalid expiry date format (MM/YY)";
    }

    if (!formData.cvv.trim()) errors.cvv = "CVV is required";
    else if (!/^\d{3,4}$/.test(formData.cvv)) errors.cvv = "CVV must be 3-4 digits";

    // Billing address validation
    if (!formData.billingAddress.street.trim()) errors["billingAddress.street"] = "Street address is required";
    if (!formData.billingAddress.city.trim()) errors["billingAddress.city"] = "City is required";
    if (!formData.billingAddress.state.trim()) errors["billingAddress.state"] = "State is required";
    if (!formData.billingAddress.zipCode.trim()) errors["billingAddress.zipCode"] = "ZIP code is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please correct the errors in the form");
      return;
    }

    try {
      setProcessing(true);
      
      // Simulate payment processing
      const orderData = await templateService.purchaseTemplate(templateId, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        company: formData.company
      });

      toast.success("Purchase completed successfully!");
      
      // Redirect to success page or download
      navigate(`/purchase-success?order=${orderData.Id}`, {
        state: { order: orderData, template }
      });

    } catch (err) {
      toast.error("Payment failed. Please try again.");
      console.error("Payment error:", err);
    } finally {
      setProcessing(false);
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadTemplate} />;
  if (!template) return <Error message="Template not found" />;

  const subtotal = template.price;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Complete Your Purchase
          </h1>
          <p className="text-slate-600">
            Secure checkout for your n8n automation template
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="order-2 lg:order-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ApperIcon name="ShoppingCart" size={20} className="mr-2" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-6">
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

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-slate-50 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <ApperIcon name="Shield" size={16} className="mr-2" />
                    What you'll get:
                  </h4>
                  <ul className="text-sm space-y-1">
                    <li>• Complete n8n workflow template</li>
                    <li>• Step-by-step setup documentation</li>
                    <li>• Configuration examples</li>
                    <li>• 30-day money-back guarantee</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Checkout Form */}
          <div className="order-1 lg:order-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        className={formErrors.firstName ? "border-red-500" : ""}
                      />
                      {formErrors.firstName && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.firstName}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        className={formErrors.lastName ? "border-red-500" : ""}
                      />
                      {formErrors.lastName && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.lastName}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={formErrors.email ? "border-red-500" : ""}
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="company">Company (Optional)</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ApperIcon name="CreditCard" size={20} className="mr-2" />
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="cardNumber">Card Number *</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={(e) => handleInputChange("cardNumber", formatCardNumber(e.target.value))}
                      maxLength={19}
                      className={formErrors.cardNumber ? "border-red-500" : ""}
                    />
                    {formErrors.cardNumber && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.cardNumber}</p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date *</Label>
                      <Input
                        id="expiryDate"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={(e) => handleInputChange("expiryDate", formatExpiryDate(e.target.value))}
                        maxLength={5}
                        className={formErrors.expiryDate ? "border-red-500" : ""}
                      />
                      {formErrors.expiryDate && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.expiryDate}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV *</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={(e) => handleInputChange("cvv", e.target.value.replace(/\D/g, ""))}
                        maxLength={4}
                        className={formErrors.cvv ? "border-red-500" : ""}
                      />
                      {formErrors.cvv && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.cvv}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Billing Address */}
              <Card>
                <CardHeader>
                  <CardTitle>Billing Address</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="street">Street Address *</Label>
                    <Input
                      id="street"
                      value={formData.billingAddress.street}
                      onChange={(e) => handleInputChange("billingAddress.street", e.target.value)}
                      className={formErrors["billingAddress.street"] ? "border-red-500" : ""}
                    />
                    {formErrors["billingAddress.street"] && (
                      <p className="text-red-500 text-sm mt-1">{formErrors["billingAddress.street"]}</p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={formData.billingAddress.city}
                        onChange={(e) => handleInputChange("billingAddress.city", e.target.value)}
                        className={formErrors["billingAddress.city"] ? "border-red-500" : ""}
                      />
                      {formErrors["billingAddress.city"] && (
                        <p className="text-red-500 text-sm mt-1">{formErrors["billingAddress.city"]}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        value={formData.billingAddress.state}
                        onChange={(e) => handleInputChange("billingAddress.state", e.target.value)}
                        className={formErrors["billingAddress.state"] ? "border-red-500" : ""}
                      />
                      {formErrors["billingAddress.state"] && (
                        <p className="text-red-500 text-sm mt-1">{formErrors["billingAddress.state"]}</p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="zipCode">ZIP Code *</Label>
                      <Input
                        id="zipCode"
                        value={formData.billingAddress.zipCode}
                        onChange={(e) => handleInputChange("billingAddress.zipCode", e.target.value)}
                        className={formErrors["billingAddress.zipCode"] ? "border-red-500" : ""}
                      />
                      {formErrors["billingAddress.zipCode"] && (
                        <p className="text-red-500 text-sm mt-1">{formErrors["billingAddress.zipCode"]}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <select
                        id="country"
                        value={formData.billingAddress.country}
                        onChange={(e) => handleInputChange("billingAddress.country", e.target.value)}
                        className="flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="GB">United Kingdom</option>
                        <option value="AU">Australia</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full gradient-button"
                size="lg"
                disabled={processing}
              >
                {processing ? (
                  <>
                    <ApperIcon name="Loader2" size={20} className="mr-2 animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <ApperIcon name="Lock" size={20} className="mr-2" />
                    Complete Purchase - ${total.toFixed(2)}
                  </>
                )}
              </Button>

              <div className="text-center text-sm text-slate-500">
                <ApperIcon name="Shield" size={16} className="inline mr-1" />
                Your payment information is secure and encrypted
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;