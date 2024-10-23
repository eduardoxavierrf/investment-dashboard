import React, { createContext, useState, useContext, ReactNode } from 'react';
import api from '../services/api';

// Define the types
interface User {
    userId: string;
    username: string;
    password: string;
}

interface AuthContextType {
    user: User | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

// Create the context with an empty initial value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// AuthProvider props type
interface AuthProviderProps {
    children: ReactNode;
}

// AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = async (username: string, password: string) => {
        api.get('/users/me', {
            auth: {
              username,
              password
            }
          })
          .then(response => {
            const userData = response.data;
            setUser({
                userId: userData.userId,
                username: userData.username,
                password
            });

          })
          .catch(error => {
            console.error('Error: ', error)
          })
    };

    const logout = () => {
        setUser(null);
    };

    const value = {
        user,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
