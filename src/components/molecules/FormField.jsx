import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";

const FormField = ({ label, error, className = "", children, ...props }) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && <Label>{label}</Label>}
      {children || <Input {...props} />}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default FormField;