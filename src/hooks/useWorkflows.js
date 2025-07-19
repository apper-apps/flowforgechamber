import { useState, useEffect } from "react";
import { workflowService } from "@/services/api/workflowService";

export const useWorkflows = () => {
  const [workflows, setWorkflows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadWorkflows = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await workflowService.getAll();
      setWorkflows(data);
    } catch (err) {
      setError(err.message || "Failed to load workflows");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWorkflows();
  }, []);

  const deleteWorkflow = async (id) => {
    try {
      await workflowService.delete(id);
      setWorkflows(prev => prev.filter(w => w.Id !== id));
    } catch (err) {
      throw new Error(err.message || "Failed to delete workflow");
    }
  };

  return {
    workflows,
    loading,
    error,
    loadWorkflows,
    deleteWorkflow
  };
};