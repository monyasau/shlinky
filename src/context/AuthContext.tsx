import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, getAuth, User } from 'firebase/auth';
import firebaseApp from '@/firebase/config';
import { userType } from '@/types/type';

const auth = getAuth(firebaseApp);

interface AuthContextType {
    user: userType | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<userType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // Here you might need to transform the Firebase `User` object to `UserType`
                const userData: userType = {
                    uid: user.uid,
                    email: user.email ?? '',
                    emailVerified: user.emailVerified,
                    isAnonymous: user.isAnonymous,
                    providerData: user.providerData as any,
                    stsTokenManager: {
                        refreshToken: (user as any).stsTokenManager.refreshToken,
                        accessToken: (user as any).stsTokenManager.accessToken,
                        expirationTime: (user as any).stsTokenManager.expirationTime,
                    },
                    createdAt: Date.now(), // or you can convert Firebase timestamp
                    lastLoginAt: Date.now(), // or you can convert Firebase timestamp
                    apiKey: auth.config.apiKey,
                };
                setUser(userData);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
            {loading ? <div className='w-full h-screen flex items-center justify-center'>Loading...</div> : children}
        </AuthContext.Provider>
    );
};
