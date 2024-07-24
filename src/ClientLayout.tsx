'use client'
import { ReactNode } from "react";
import { AuthContextProvider } from '@/context/AuthContext';
import TopNav from "./components/TopNav";

const ClientLayout = ({ children }: { children: ReactNode }) => {
  return (
    <AuthContextProvider>
      <TopNav/>
      {children}
    </AuthContextProvider>
  );
};

export default ClientLayout;
