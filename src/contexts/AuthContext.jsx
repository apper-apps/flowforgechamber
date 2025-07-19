import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '@/services/api/authService';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const currentUser = authService.getCurrentUser();
        if (currentUser) {
          const isValid = await authService.validateSession();
          if (isValid) {
            setUser(currentUser);
          } else {
            await authService.logout();
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const userData = await authService.login(email, password);
      setUser(userData);
      toast.success(`Welcome back, ${userData.name}!`);
      return userData;
    } catch (error) {
      toast.error(error.message || 'Login failed');
      throw error;
    } finally {
      setLoading(false);
    }
};

  const signup = async (name, email, password) => {
    try {
      setLoading(true);
      const userData = await authService.signup(name, email, password);
      setUser(userData);
      toast.success(`Welcome to auton8n, ${userData.name}!`);
      return userData;
    } catch (error) {
      toast.error(error.message || 'Signup failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await authService.logout();
      setUser(null);
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Logout failed');
    } finally {
      setLoading(false);
    }
  };
const value = {
    user,
    login,
    signup,
    logout,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};