import { authAPI } from './api';

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

const STORAGE_KEY = 'nearcraft_user';
const TOKEN_KEY = 'nearcraft_token';

export const getCurrentUser = (): User | null => {
  try {
    const userJson = localStorage.getItem(STORAGE_KEY);
    return userJson ? JSON.parse(userJson) : null;
  } catch {
    return null;
  }
};

export const login = async (email: string, password: string): Promise<User | null> => {
  console.log('🔐 Login attempt for user:', email); // Debug trace
  
  try {
    const response = await authAPI.login({ email, password });
    const { user, token } = response.data;
    
    console.log('✅ User logged in successfully:', user.email);
    
    // Store user and token
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    localStorage.setItem(TOKEN_KEY, token);
    
    return user;
  } catch (error: any) {
    console.error('💥 Login error:', error);
    
    if (error.response?.status === 401) {
      console.log('❌ Invalid credentials');
    }
    
    return null;
  }
};

export const register = async (name: string, email: string, password: string): Promise<User | null> => {
  console.log('📝 Registration attempt for user:', email); // Debug trace
  
  try {
    const response = await authAPI.signup({ name, email, password });
    const { user, token } = response.data;
    
    console.log('✅ New user created:', user.email);
    
    // Store user and token
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    localStorage.setItem(TOKEN_KEY, token);
    
    return user;
  } catch (error: any) {
    console.error('💥 Registration error:', error);
    
    if (error.response?.status === 400) {
      console.log('⚠️ Email already exists:', email);
    }
    
    return null;
  }
};

export const logout = (): void => {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(TOKEN_KEY);
};

export const isLoggedIn = (): boolean => {
  return getCurrentUser() !== null && localStorage.getItem(TOKEN_KEY) !== null;
};
