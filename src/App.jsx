import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "@/contexts/AuthContext";
import Header from "@/components/organisms/Header";
import Landing from "@/pages/Landing";
import Dashboard from "@/pages/Dashboard";
import WorkflowCreator from "@/pages/WorkflowCreator";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Marketplace from "@/pages/Marketplace";
import TemplateDetails from "@/pages/TemplateDetails";
import Checkout from "@/pages/Checkout";
import PurchaseSuccess from "@/pages/PurchaseSuccess";
import ProtectedRoute from "@/components/ProtectedRoute";
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Header />
          <main>
<Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/create" element={
                <ProtectedRoute>
                  <WorkflowCreator />
                </ProtectedRoute>
              } />
              <Route path="/marketplace" element={
                <ProtectedRoute>
                  <Marketplace />
                </ProtectedRoute>
              } />
              <Route path="/marketplace/:id" element={
                <ProtectedRoute>
                  <TemplateDetails />
                </ProtectedRoute>
              } />
              <Route path="/checkout" element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              } />
              <Route path="/purchase-success" element={
                <ProtectedRoute>
                  <PurchaseSuccess />
                </ProtectedRoute>
              } />
            </Routes>
</main>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            style={{ zIndex: 9999 }}
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;