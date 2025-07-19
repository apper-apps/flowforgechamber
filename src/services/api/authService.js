// Mock user data
let mockUsers = [
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

// Track last used ID for auto-increment
let lastUserId = 2;

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
return true;
  }

  async signup(name, email, password) {
    await delay(800);

    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      throw new Error('An account with this email already exists');
    }

    // Create new user
    const newUser = {
      Id: ++lastUserId,
      email,
      password,
      name,
      avatar: null
    };

    // Add to mock users array
    mockUsers.push(newUser);

    // Create user session without password
    const userSession = {
      Id: newUser.Id,
      email: newUser.email,
      name: newUser.name,
      avatar: newUser.avatar
    };

    this.currentUser = userSession;
    localStorage.setItem('auton8n_user', JSON.stringify(userSession));
    
    return { ...userSession };
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