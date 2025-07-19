import { cn } from "@/utils/cn";

const Loading = ({ className, type = "skeleton" }) => {
  if (type === "spinner") {
    return (
      <div className={cn("flex items-center justify-center p-8", className)}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (type === "dots") {
    return (
      <div className={cn("flex items-center justify-center space-x-2 p-8", className)}>
        <div className="animate-bounce w-2 h-2 bg-primary-600 rounded-full"></div>
        <div className="animate-bounce w-2 h-2 bg-primary-600 rounded-full" style={{ animationDelay: "0.1s" }}></div>
        <div className="animate-bounce w-2 h-2 bg-primary-600 rounded-full" style={{ animationDelay: "0.2s" }}></div>
      </div>
    );
  }

  return (
    <div className={cn("animate-pulse space-y-4 p-6", className)}>
      <div className="h-4 bg-slate-200 rounded w-3/4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-slate-200 rounded"></div>
        <div className="h-4 bg-slate-200 rounded w-5/6"></div>
      </div>
      <div className="h-8 bg-slate-200 rounded w-1/4"></div>
    </div>
  );
};

export default Loading;