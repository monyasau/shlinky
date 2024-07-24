'use client'
import { ReactNode } from "react";
import { AuthContextProvider } from '@/context/AuthContext';

const ClientLayout = ({ children }: { children: ReactNode }) => {
  return (
    <AuthContextProvider>
      {children}
    </AuthContextProvider>
  );
};

export default ClientLayout;
