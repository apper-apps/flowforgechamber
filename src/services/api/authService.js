// Mock user data
const mockUsers = [
  {
    Id: 1,
    email: "demo@example.com",
    password: "password123",
    name: "Demo User",
    avatar: null
  },
  {
    Id: 2,
    email: "admin@auton8n.com",
    password: "admin123",
    name: "Admin User",
    avatar: null
  }
];

// Simulate authentication delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class AuthService {
  constructor() {
    this.currentUser = null;
    this.initializeUser();
  }

  initializeUser() {
    const savedUser = localStorage.getItem('auton8n_user');
    if (savedUser) {
      try {
        this.currentUser = JSON.parse(savedUser);
      } catch (error) {
        localStorage.removeItem('auton8n_user');
      }
    }
  }

  async login(email, password) {
    await delay(800);

    const user = mockUsers.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Create user session without password
    const userSession = {
      Id: user.Id,
      email: user.email,
      name: user.name,
      avatar: user.avatar
    };

    this.currentUser = userSession;
    localStorage.setItem('auton8n_user', JSON.stringify(userSession));
    
    return { ...userSession };
  }

  async logout() {
    await delay(300);
    
    this.currentUser = null;
    localStorage.removeItem('auton8n_user');
    
    return true;
  }

  getCurrentUser() {
    return this.currentUser ? { ...this.currentUser } : null;
  }

  isAuthenticated() {
    return this.currentUser !== null;
  }

  async validateSession() {
    await delay(200);
    
    if (!this.currentUser) {
      return false;
    }

    // In a real app, this would validate with the server
    return true;
  }
}

export const authService = new AuthService();