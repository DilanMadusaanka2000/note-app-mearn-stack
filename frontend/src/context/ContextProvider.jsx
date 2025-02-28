import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

const authContext = createContext();

function ContextProvider({ children }) {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null); 
    const [loading, setLoading] = useState(true);

    const login = (user) => {
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user)); // Save user data in localStorage
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    useEffect(() => {
        const verifyUser = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setUser(null);
                setLoading(false);
                return;
            }

            try {
                const res = await axios.get('http://localhost:8800/api/auth/verify', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (res.data.success) {
                    setUser(res.data.user);
                    localStorage.setItem('user', JSON.stringify(res.data.user)); // Update user data
                } else {
                    logout();
                }
            } catch (error) {
                console.error('Verification failed:', error);
                logout();
            } finally {
                setLoading(false); // Stop loading
            }
        };

        verifyUser();
    }, []);

    return (
        <authContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </authContext.Provider>
    );
}


export const useAuth = () => useContext(authContext);
export default ContextProvider;
